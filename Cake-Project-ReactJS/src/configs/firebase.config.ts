
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBPE4xj8dv5am5U2FOPUNp5bODg1uVcrFo",
    authDomain: "learn-firebase-bd824.firebaseapp.com",
    projectId: "learn-firebase-bd824",
    storageBucket: "learn-firebase-bd824.appspot.com",
    messagingSenderId: "51705167109",
    appId: "1:51705167109:web:6c666a5517d64c8e2e0b6c",
    measurementId: "G-7E03YSQJRJ"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export default storage