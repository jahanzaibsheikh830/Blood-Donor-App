import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Touchable, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera, faCoffee } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Storage from './../config/Firebase'
export default function UploadProfile() {
    const [image, setImage] = useState(null);
    const [firebaseImg, setFirbaseImg] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
        let imgName = Math.random() * 2000*1223234;
        let res = await fetch(result.uri);
        let blob = await res.blob();
        let ref = Storage.ref('pictures/',imgName);
        return ref.put(blob).then((snapShot)=>{
            snapShot.ref.getDownloadURL().then((URL)=>{
                setFirbaseImg(URL)
            })
        })
    };

    return (
        <View>
            {<Image source={image === null ? require('./../assets/fallback.png') : { uri: image }} style={{
                width: 150,
                height: 150, borderRadius: 100,
                borderColor: '#000', borderWidth: 1
            }} />
            }
            <TouchableOpacity onPress={pickImage} style={{ position: 'absolute', top: "80%", left: "30%" }}>
                {/* <FontAwesomeIcon icon={faCoffee} /> */}
                <FontAwesomeIcon icon={faCamera} size={24} color={'#000'} />
            </TouchableOpacity>
        </View>
    );
}