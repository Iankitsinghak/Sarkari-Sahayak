"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

// Make sure env variables exist
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  throw new Error("Missing Firebase environment variables!");
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Only initialize auth in the browser
export const auth =
  typeof window !== "undefined" ? getAuth(app) : (null as any);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Persist user session
if (typeof window !== "undefined" && auth) {
  setPersistence(auth, browserLocalPersistence).catch((e) => {
    console.error("Auth persistence error:", e);
  });
}
