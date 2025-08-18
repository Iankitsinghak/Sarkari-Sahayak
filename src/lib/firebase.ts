// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Use NEXT_PUBLIC_ vars for Next.js
const firebaseConfig = {
  clientId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID!,
};

const app = initializeApp(firebaseConfig as any);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
