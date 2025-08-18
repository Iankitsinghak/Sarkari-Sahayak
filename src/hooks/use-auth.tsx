"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/components/auth-provider";
import { getAuth, getRedirectResult, UserCredential } from "firebase/auth";
import { app } from "@/lib/firebase"; // make sure firebase.ts exports app

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  useEffect(() => {
    const auth = getAuth(app);

    // Handle the redirect result (Google login redirect flow)
    getRedirectResult(auth)
      .then((result: UserCredential | null) => {
        if (result && result.user) {
          console.log("✅ Google Sign-in successful:", result.user);
        }
      })
      .catch((error) => {
        console.error("❌ Google Sign-in redirect error:", error);
      });
  }, []);

  return context;
};
