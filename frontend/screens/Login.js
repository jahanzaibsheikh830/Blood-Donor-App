import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { useGlobalState, useGlobalStateUpdate } from '../context/GlobalContext'
function Login(props) {
    const [data, setData] = useState({
        email: '',
        password: ""
    })
    const use = useGlobalState()
    const update = useGlobalStateUpdate()
    function login() {
        if (data.email === "" || data.password === '') {
            alert('Please fill all required field')
        }
        else {
            axios({
                method: 'post',
                url: "http://192.168.1.112:5000/login",
                // url: "http://localhost:5000/login",
                data: data,
                withCredentials: true
            }).then((res) => {
                if (res.data.status === 200) {
                    update(prev =>({
                        ...prev,
                        loginStatus: true,
                        user: res.data.user
                    }))
                }
                else{
                    alert(res.data.message)
                }
            }).catch((er) => {
                console.log(er)
            })
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold' }}>Blood Donor App</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={(v) => setData(prev => ({ ...prev, email: v.toLowerCase() }))}
                />
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(v) => setData(prev => ({ ...prev, password: v }))}
                />
                <TouchableOpacity activeOpacity={0.8} style={styles.btn} title="submit" onPress={login}>
                    <Text style={{color: '#fff', fontSize: 18}}>Login</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, fontSize: 18 }}>Don't have an account? <Text onPress={() => props.navigation.navigate('Signup')} style={{ color: "#dc143c" }}>Signup</Text></Text>
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
        flex: 2,
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
        marginBottom: 10,
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

export default Login