import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel  } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAD853_JMfRjoR0rEEgxoNrhHPfjxHXSIU",
  authDomain: "sifainterior-2711.firebaseapp.com",
  projectId: "sifainterior-2711",
  storageBucket: "sifainterior-2711.firebasestorage.app",
  messagingSenderId: "235705498035",
  appId: "1:235705498035:web:c33289e1742996bf33f3c6",
  measurementId: "G-78XGDM0279"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  setLogLevel("debug");
  
  export { db };
