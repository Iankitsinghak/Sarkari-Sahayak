"use client";

import {
  auth,
  googleProvider
} from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from "firebase/auth";

// Sign in with Google (popup preferred)
export async function signInWithGoogle(): Promise<User | null> {
  if (!auth) return null;

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Google Sign-In Error:", error.code, error.message);

    if (error.code === "auth/unauthorized-domain") {
      alert("Domain not authorized in Firebase console.");
    } else if (error.code === "auth/operation-not-allowed") {
      alert("Google sign-in not enabled in Firebase Authentication.");
    } else if (
      error.code === "auth/popup-blocked" ||
      error.code === "auth/popup-closed-by-user"
    ) {
      await signInWithRedirect(auth, googleProvider);
    }
    return null;
  }
}

// Complete redirect flow
export async function handleRedirectResult(): Promise<User | null> {
  if (!auth) return null;
  try {
    const result = await getRedirectResult(auth);
    return result?.user ?? null;
  } catch (err) {
    console.error("Redirect result error:", err);
    return null;
  }
}

// Sign out
export async function signOut(): Promise<void> {
  if (!auth) return;
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
  }
}

// Listen for auth changes
export function onAuthChanged(callback: (user: User | null) => void) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
}
