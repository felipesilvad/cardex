// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkBeH1gLT31x-3n6sbG14Dlw9z8BwUxOA",
  authDomain: "cardex-26f5f.firebaseapp.com",
  projectId: "cardex-26f5f",
  storageBucket: "cardex-26f5f.appspot.com",
  messagingSenderId: "1063367523849",
  appId: "1:1063367523849:web:82b15d2d9fd76b96b742d8",
  measurementId: "G-TBFPFHWMSG"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app)

export {storage, auth};
export default getFirestore();