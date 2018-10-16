import firebase from 'react-native-firebase';

const config = {
    apiKey: "AIzaSyAiD9DNasjLsZ0p5w3bE94G_aGPDNmbIvI",
    authDomain: "evarkadasim-1.firebaseapp.com",
    databaseURL: "https://evarkadasim-1.firebaseio.com",
    projectId: "evarkadasim-1",
    storageBucket: "evarkadasim-1.appspot.com",
    messagingSenderId: "566945460977",
    appId:"1:566945460977:android:1969b19e11b06580"
  };

  const app = firebase.initializeApp(config,"evarkadasim");
  const auth = firebase.auth();

export default {app,auth};