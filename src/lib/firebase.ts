// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Parse JSON from env variable
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth + Google provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
