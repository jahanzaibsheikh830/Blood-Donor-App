import React, { useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet, ScrollView,TouchableOpacity } from 'react-native'
import axios from 'axios'
function Donors(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: "http://192.168.1.112:5000/getDonors",
            withCredentials: true
        }).then((res) => {
            if (res.data.status === 200) {
                setData(res.data.data)
                console.log(res.data.data)
            }
            else {
                alert(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    data.map((v, i) => {
                        return (
                            <TouchableOpacity key={i} activeOpacity={.8} style={styles.main} 
                            onPress={() => props.navigation.navigate('DonorsDetails',{data: v})}>
                                <View>
                                    <Image source={require('./../assets/fallback.png')} style={{
                                        width: 80,
                                        height: 80, borderRadius: 50,
                                        borderColor: 'black', borderWidth: 1
                                    }} />
                                </View>
                                <View style={{ marginLeft: 40, marginTop: 10 }}>
                                    <Text style={{ fontSize: 16, marginBottom: 5 }}>{v.fullName.toUpperCase()}</Text>
                                    <Text style={{ color: "grey" }}>Blood group : {v.bloodGroup.toUpperCase()}</Text>
                                    <Text style={{ color: "grey" }}>Contact : {v.phone}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    main: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#dc143c",
        // backgroundColor: "#DCDCDC"
    }
})
export default Donors