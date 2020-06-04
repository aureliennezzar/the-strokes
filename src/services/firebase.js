import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC3dhmObqPs4L7dIv_XMK1pl1B0HORJaPE",
    authDomain: "thestrokes-117ae.firebaseapp.com",
    databaseURL: "https://thestrokes-117ae.firebaseio.com",
    projectId: "thestrokes-117ae",
    storageBucket: "thestrokes-117ae.appspot.com",
    messagingSenderId: "802456405430",
    appId: "1:802456405430:web:4e370973bf3403d940ad17",
    measurementId: "G-D2DLG4ZQZB"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = storage.ref();