
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBCyVWPPzyIuiPxNoJVZS1X5RpeVedX3Og",
    authDomain: "loginfirebase-202cc.firebaseapp.com",
    projectId: "loginfirebase-202cc",
    storageBucket: "loginfirebase-202cc.appspot.com",
    messagingSenderId: "775768992108",
    appId: "1:775768992108:web:c3ba4b4281e7e7a4f8eb49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
