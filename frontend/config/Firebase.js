import firebase from 'firebase/app'
import 'firebase/storage'
var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let Storage = firebase.storage();

export default Storage
