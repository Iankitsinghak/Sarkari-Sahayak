"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/components/auth-provider";
import { handleRedirectResult } from "@/services/auth-service";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // On mount, complete redirect flow if it happened
  useEffect(() => {
    handleRedirectResult();
  }, []);

  return context;
};
