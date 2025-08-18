// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvNcVi2rjHjWEpMiZY61uIwWbILGoP07M",
  authDomain: "sarkari-sahayak-y50gt.firebaseapp.com",
  projectId: "sarkari-sahayak-y50gt",
  storageBucket: "sarkari-sahayak-y50gt.appspot.com",
  messagingSenderId: "83668272398",
  appId: "1:83668272398:web:d9623abd2f8a1438f1835f",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Only create auth in the browser
export const auth =
  typeof window !== "undefined" ? getAuth(app) : (null as any);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Ensure persistence (so user stays signed in on refresh)
if (typeof window !== "undefined" && auth) {
  setPersistence(auth, browserLocalPersistence).catch((e) => {
    console.error("Auth persistence error:", e);
  });
}

