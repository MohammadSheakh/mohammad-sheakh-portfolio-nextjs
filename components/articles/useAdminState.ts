"use client";

import { useEffect, useState } from "react";

export type AdminState = "checking" | "admin" | "guest";

export default function useAdminState() {
  const [adminState, setAdminState] = useState<AdminState>("admin");

  // Share the same preview and session-based admin rules across article routes.
  useEffect(() => {
    let active = true;

    const checkAdmin = async () => {
      if (process.env.NEXT_PUBLIC_ADMIN_PREVIEW === "true") {
        if (active) setAdminState("admin");
        return;
      }

      const authMeUrl = process.env.NEXT_PUBLIC_AUTH_ME_URL;
      if (!authMeUrl) {
        if (active) setAdminState("guest");
        return;
      }

      try {
        const response = await fetch(authMeUrl, { credentials: "include" });
        if (!response.ok) throw new Error("Not authenticated");
        const session = (await response.json()) as {
          role?: string;
          isAdmin?: boolean;
          user?: { role?: string };
        };
        const isAdmin =
          session.isAdmin === true ||
          session.role === "admin" ||
          session.user?.role === "admin";
        if (active) setAdminState(isAdmin ? "admin" : "guest");
      } catch {
        if (active) setAdminState("guest");
      }
    };

    checkAdmin();
    return () => {
      active = false;
    };
  }, []);

  return adminState;
}
