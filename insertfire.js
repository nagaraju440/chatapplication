import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCGweV0eUBQZeOg2czvym401C8Z9Au4Ti4",
    authDomain: "letschat-1f751.firebaseapp.com",
    databaseURL: "https://letschat-1f751.firebaseio.com",
    projectId: "letschat-1f751",
    storageBucket: "letschat-1f751.appspot.com",
    messagingSenderId: "571374496236",
    appId: "1:571374496236:web:c3a8ced02d62487f0af8c9",
    measurementId: "G-YPRJ9V4GVS"
  };
  // Initialize Firebase
  var insertfire=firebase.initializeApp(firebaseConfig);
  export default insertfire;