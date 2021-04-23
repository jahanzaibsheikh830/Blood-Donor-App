import React from 'react'
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'
function Signup(props) {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })
    function submit(){
        if(data.name === '' || data.email === '' || data.phone === '' || data.password === ''){
            alert('Please fill all required field')
        }
        else{
            axios({
                method: 'post',
                url: 'http://192.168.1.112:5000/signup',
                // url: "http://localhost:5000/signup",
                data: data,
                withCredentials: true
            }).then((res)=>{
                alert(res.data.message)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold' }}>Register</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    placeholder='Full Name'
                    style={styles.input}
                    onChangeText={(v) => setData(prev => ({ ...prev, name: v }))}
                />
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={(v) => setData(prev => ({ ...prev, email: v }))}
                />
                <TextInput
                    placeholder='Phone'
                    style={styles.input}
                    onChangeText={(v) => setData(prev => ({ ...prev, phone: v }))}
                />
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    onChangeText={(v) => setData(prev => ({ ...prev, password: v }))}
                    secureTextEntry={true}
                />
                <TouchableOpacity activeOpacity={0.8} style={styles.btn} title='submit' onPress={submit}>
                    <Text style={{color: '#fff', fontSize: 18}}>Signup</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, fontSize: 18 }}>Already have an account? <Text onPress={() => props.navigation.navigate('Login')} style={{ color: "#dc143c" }}>Login</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#dc143c"
    },
    text: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        flex: 3,
        alignItems: "center",
        paddingTop: 50,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    input: {
        height: 40,
        width: '80%',
        marginTop: 10,
        marginBottom:10,
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#dc143c'
    },
    btn: {
        backgroundColor: "#dc143c",
        width: "80%",
        borderRadius: 20,
        padding: 12,
        alignItems: "center",
        color: '#fff',
        fontSize: 20,
    }
})

export default Signup