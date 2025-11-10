// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByC4IRgVSSZXZe6xR6m0XTa_sXuljUvEg",
  authDomain: "chiffonated-5ebb6.firebaseapp.com",
  projectId: "chiffonated-5ebb6",
  storageBucket: "chiffonated-5ebb6.firebasestorage.app",
  messagingSenderId: "249160130807",
  appId: "1:249160130807:web:c7655d81ab741ba5e333f2",
  measurementId: "G-GX5K8WB4ZY"
};

const hasConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);

let app = null;
let auth = null;
let db = null;
let storage = null;

if (hasConfig) {
  try {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (err) {
    console.error('Firebase initialization error:', err);
  }
} else {
  console.warn(
    'Firebase config missing. Add REACT_APP_FIREBASE_* variables to .env. Until then auth/db/storage are null.'
  );
}

export { app, auth, db, storage };