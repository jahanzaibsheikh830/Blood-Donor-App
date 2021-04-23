import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
// import axios from 'axios'
import UploadProfile from './UploadProfile'
import Logout from './Logout'
import { useGlobalState, useGlobalStateUpdate } from '../context/GlobalContext'
function Profile(props) {
    const use = useGlobalState()
    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <UploadProfile/>
                <Text style={{ fontSize: 24, color: '#000'}}>
                    {use.user.name.charAt(0).toUpperCase() + use.user.name.slice(1)}
                </Text>
            </View>
            <View style={styles.profile}>
                <View style={styles.profileDetails}>
                    <View><Text style={{ color: '#fff', fontSize: 16 }}>Phone :</Text></View>
                    <View><Text style={{ color: '#fff', fontSize: 16 }}>{use.user.phone}</Text></View>
                    <View><Text style={{ color: '#fff', fontSize: 16 }}>Email :</Text></View>
                    <View><Text style={{ color: '#fff', fontSize: 16 }}>{use.user.email}</Text></View>
                    <View>
                    <Logout/>
                    <TouchableOpacity activeOpacity={1} style={styles.btns}><Text >Edit Profile</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    image: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20
    },
    profile: {
        flex: 2,
        // alignItems: "center",
        // paddingTop: 50,
        backgroundColor: '#fff',
        // backgroundColor: "grey",
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
    },
    profileDetails: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: "#dc143c",
        margin: 10,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#dc143c',
        marginTop: 10,
        marginBottom: 10,
    },
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

export default Profile