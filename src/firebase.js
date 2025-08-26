import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false, "VITE_API_BASE_URL": "http://localhost:3005", "VITE_FIREBASE_API_KEY": "AIzaSyCuNFmOdOEZB76sbkpP_3TXvJ_T4SjUQc0", "VITE_FIREBASE_APP_ID": "1:545935308634:web:c362c7ab5706e63c276563", "VITE_FIREBASE_AUTH_DOMAIN": "bookdashboarapp.firebaseapp.com", "VITE_FIREBASE_MESSAGING_SENDER_ID": "545935308634", "VITE_FIREBASE_PROJECT_ID": "bookdashboarapp", "VITE_FIREBASE_STORAGE_BUCKET": "bookdashboarapp.firebasestorage.app"};
import { initializeApp } from "/node_modules/.vite/deps/firebase_app.js?v=f36ad243";
import { getStorage } from "/node_modules/.vite/deps/firebase_storage.js?v=f36ad243";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);