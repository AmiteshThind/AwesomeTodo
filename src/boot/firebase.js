import * as firebase from "firebase/app";
import "firebase/auth";
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDmovEA5K7se66wqTcmxoRi902AITWrrIQ",
    authDomain: "todoit-18cc9.firebaseapp.com",
    databaseURL: "https://todoit-18cc9.firebaseio.com",
    projectId: "todoit-18cc9",
    storageBucket: "todoit-18cc9.appspot.com",
    messagingSenderId: "524784273559",
    appId: "1:524784273559:web:5dcb0b5ef6abb7662c41d2",
    measurementId: "G-WLPCRX104X"
  };
  // Initialize Firebase
  let firebaseApp = firebase.initializeApp(firebaseConfig);


  let firebaseAuth = firebaseApp.auth()

  export {firebaseAuth}