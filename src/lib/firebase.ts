// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Use only Client ID from .env
const firebaseConfig = {
  clientId: import.meta.env.VITE_FIREBASE_CLIENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig as any);

// Auth + Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
