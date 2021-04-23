import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Button, Image } from 'react-native';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'

function Donate(props) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [data, setData] = useState({
        fullName: "",
        phone: "",
        bloodGroup: "",
        gender: "",
        address: "",
        latitude: "",
        longitude: ""
        // pImg: null
    })

    useEffect(() => {
        // function getLoc(){
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setData(prev=>({...prev, latitude:location.coords.latitude, longitude:location.coords.longitude}));
        })();
        // }
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    // console.log(data)
    function submit() {
        if (data.fullName === '' || data.phone === '' ||
            data.bloodGroup === '' || data.gender === '' ||
            data.address === '' || data.latitude === '' ||
            data.longitude === '') {
            alert('Please fill all required field')
        }
        else {
            // console.log(data)
            axios({
                method: 'post',
                url: 'http://192.168.1.112:5000/donate',
                // url: 'http://localhost:5000/donate',
                data: data,
                withCredentials: true
            }).then((res) => {
                if(res.data.status === 200){
                    alert(res.data.message)
                }
                else{
                    alert(res.data.message)

                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.form}>
            <Text style={{fontSize: 30, color:'#dc143c', marginBottom: 30}}>Donation Form</Text>
                <TextInput
                    placeholder='Full Name'
                    style={styles.input}
                    onChangeText={(v) => setData(prev => ({ ...prev, fullName: v.toLowerCase() }))}
                />
                <TextInput
                    placeholder='Phone'
                    style={styles.input}
                    onChangeText={(v) => setData(prev => ({ ...prev, phone: v }))}
                />
                <TextInput
                    placeholder='Address'
                    style={styles.input}
                    onChangeText={(v) => setData(prev => ({ ...prev, address: v }))}
                />
                <View style={styles.bloodInput}>
                    <Picker
                        selectedValue={data.gender}
                        onValueChange={(itemValue) => setData(prev => ({ ...prev, gender: itemValue }))}
                    >
                        <Picker.Item label="Gender" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
                </View>
                <View style={styles.bloodInput}>
                    <Picker
                        selectedValue={data.bloodGroup}
                        onValueChange={(itemValue) => setData(prev => ({ ...prev, bloodGroup: itemValue }))}
                    >
                        <Picker.Item label="Blood Group" />
                        <Picker.Item label="A+" value="a+" />
                        <Picker.Item label="O+" value="o+" />
                        <Picker.Item label="B+" value="b+" />
                        <Picker.Item label="AB+" value="ab+" />
                        <Picker.Item label="A-" value="a-" />
                        <Picker.Item label="O-" value="o-" />
                        <Picker.Item label="B-" value="b-" />
                        <Picker.Item label="AB-" value="ab-" />
                    </Picker>
                </View>
                <TouchableOpacity activeOpacity={1} style={styles.btn} title='submit' onPress={submit}><Text style={{ color: '#fff' }}>Donate</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 3,
        alignItems: "center", 
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#dc143c'
    },
    bloodInput: {
        height: 50,
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 20,
        color: "grey",
        borderColor: '#dc143c'
    },
    btn: {
        backgroundColor: "#dc143c",
        width: "80%",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        color: '#fff',
        fontSize: 20,
    },
    btn1: {
        backgroundColor: "#fff",
        width: "80%",
        borderRadius: 20,
        borderColor: "#dc143c",
        borderWidth: 1,
        marginBottom: 10,
        padding: 12,
        alignItems: "center",
        color: '#fff',
        fontSize: 20,
    }
})

export default Donate