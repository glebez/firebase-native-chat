import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBSJlvpEFcIyt_3EEPcVkmj4blahi4nIu8",
    authDomain: "fireanse-native-chat.firebaseapp.com",
    databaseURL: "https://fireanse-native-chat.firebaseio.com",
    projectId: "fireanse-native-chat",
    storageBucket: "fireanse-native-chat.appspot.com",
    messagingSenderId: "622583529104"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebaseAuth = firebase.auth();
export const firebaseDB = firebase.database();
