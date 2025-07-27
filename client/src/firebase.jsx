import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCQkoVcl33ggLduG6n43QvZ_Wv-f5G-sSc",

  authDomain: "electroshop-73623.firebaseapp.com",

  projectId: "electroshop-73623",

  storageBucket: "electroshop-73623.firebasestorage.app",

  messagingSenderId: "357640054473",

  appId: "1:357640054473:web:c933111bfb08e75b668f18",

  measurementId: "G-3R8BTJ1M12",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
