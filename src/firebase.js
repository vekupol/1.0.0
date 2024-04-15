import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA5-keBFhpHx7cyDWMsL8-yFtKximzJ2aw",
    authDomain: "venusegitim-722d8.firebaseapp.com",
    projectId: "venusegitim-722d8",
    storageBucket: "venusegitim-722d8.appspot.com",
    messagingSenderId: "277901627283",
    appId: "1:277901627283:web:9d178c247b532b8d86a266",
    measurementId: "G-NM00QFQTP3"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db, collection, query, where, addDoc, getDocs, deleteDoc, getStorage, ref, uploadBytes, getDownloadURL, deleteObject }; 