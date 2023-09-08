// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCTuNauCNfI0lFSDmClbfx44DfB-03iac",
    authDomain: "rn-fb-3da92.firebaseapp.com",
    projectId: "rn-fb-3da92",
    storageBucket: "rn-fb-3da92.appspot.com",
    messagingSenderId: "561906698380",
    appId: "1:561906698380:web:e499e71c596ac5e280d3a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc }