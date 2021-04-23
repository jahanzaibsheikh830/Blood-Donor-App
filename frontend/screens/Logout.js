import React from 'react'
import axios from 'axios'
import {StyleSheet,TouchableOpacity, Text} from 'react-native'
import { useGlobalStateUpdate } from '../context/GlobalContext'
function Logout() {
    const globalStateUpdate = useGlobalStateUpdate()
    function logout() {
        axios({
            method: 'post',
            url: 'http://192.168.1.112:5000/logout',
            withCredentials: true
        }).then((response) => {
            globalStateUpdate(prev => ({
                ...prev,
                loginStatus: false,
            }))
        }, (error) => {
            console.log(error);
        });
    }
    return (
            <TouchableOpacity activeOpacity={1} style={styles.btns} onPress={logout}><Text >Logout</Text></TouchableOpacity>    
    )
}

const styles = StyleSheet.create({
    btns: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#dc143c',
        paddingTop: 10, 
        paddingBottom: 10, 
        paddingLeft: 30, 
        paddingRight: 30,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10
    }
})
export default Logout