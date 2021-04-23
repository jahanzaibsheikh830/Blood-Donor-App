import React from "react"
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
function DonorsDetails({ route }) {
    const { data } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.mapview}>
                <MapView style={styles.map} initialRegion={{
                    latitude: Number(data.latitude),
                    longitude: Number(data.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,  
                }}>
                    <MapView.Marker coordinate={{
                        latitude: Number(data.latitude),
                        longitude: Number(data.longitude),
                    }} title={"Donor Location"} />
                </MapView>
            </View>
            <View style={styles.donorData}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginTop: 20, marginLeft: 10 }}>
                        <Image source={require('./../assets/fallback.png')} style={{
                            width: 120,
                            height: 120, borderRadius: 100,
                            borderColor: '#fff', borderWidth: 1
                        }} />
                    </View>
                    <View style={{flex:1 , justifyContent: 'center',marginLeft:10}}>
                        <View>
                            <View>
                                <Text style={{
                                    color: '#fff', fontSize: 18, marginTop: 3,
                                }}>{data.fullName.toUpperCase()}</Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={{
                                    color: '#fff', fontSize: 18, marginTop: 3
                                }}>{data.phone}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ padding: 15 }}>
                    <View>
                        <Text style={{ color: '#fff', }}>Gender</Text>
                    </View>
                    <View>
                        <Text style={{
                            color: '#fff', fontSize: 18, marginTop: 3, borderBottomWidth: 1,
                            borderBottomColor: '#fff'
                        }}>{data.gender.charAt(0).toUpperCase() + data.gender.slice(1)}</Text>
                    </View>
                </View>
                <View style={{ padding: 15 }}>
                    <View>
                        <Text style={{ color: '#fff', }}>Blood Group</Text>
                    </View>
                    <View>
                        <Text style={{
                            color: '#fff', fontSize: 18, marginTop: 3, borderBottomWidth: 1,
                            borderBottomColor: '#fff'
                        }}>{data.bloodGroup.toUpperCase()}</Text>
                    </View>
                </View>
                <View style={{ padding: 15 }}>
                    <View>
                        <Text style={{ color: '#fff', }}>Address</Text>
                    </View>
                    <View>
                        <Text style={{
                            color: '#fff', fontSize: 18, marginTop: 3, borderBottomWidth: 1,
                            borderBottomColor: '#fff'
                        }}>{data.address}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    donorData: {
        flex: 2,
        // alignItems: 'center',
        backgroundColor: '#bb1c1c',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
export default DonorsDetails