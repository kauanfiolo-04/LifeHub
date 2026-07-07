"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth.service";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function authenticate() {
      try {
        const { accessToken } = await AuthService.refresh();

        localStorage.setItem("accessToken", accessToken);

        router.replace("/dashboard");
      } catch {
        router.replace("/login");
      }
    }

    void authenticate();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">
        Finalizando autenticação...
      </p>
    </main>
  );
}