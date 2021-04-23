import React from 'react'
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native'
import TabNav from './StackNav'
function Dashboard(props) {
    return (
        <View style={styles.bBtnContainer}>
            <TabNav />
            <View>
                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={()=>props.navigation.navigate('Donate')}>
                    <Text style={{color: "#fff",fontSize: 18}}>Become a Donor</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bBtnContainer: {
        flex: 1,
        alignContent: "flex-end"
    },
    btn: {
        backgroundColor: "#dc143c",
        padding: 20,
        alignItems: "center",
        color: '#fff',
        fontSize: 20,
    }
})

export default Dashboard