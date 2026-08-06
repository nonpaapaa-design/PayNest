const firebaseConfig = {
    apiKey: "AIzaSyDBM7OpDLtEgBIahZ5wCDZr0t4NwRborRU",
    authDomain: "paynest-premium.firebaseapp.com",
    projectId: "paynest-premium",
    storageBucket: "paynest-premium.firebasestorage.app",
    messagingSenderId: "22112391850",
    appId: "1:22112391850:web:d84ddc8c80e4c768b0f6d3",
    measurementId: "G-JPE3D0Y6GN"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();