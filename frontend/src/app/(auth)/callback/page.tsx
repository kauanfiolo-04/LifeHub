"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { useRefreshToken } from "@/hooks/auth/useRefreshToken";
import { setAccessToken } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

export default function CallbackPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: refreshMutateAsync } = useRefreshToken();

  useEffect(() => {
    async function authenticate() {
      try {
        const { accessToken } = await refreshMutateAsync();

        setAccessToken(accessToken);

        const response = await AuthService.me();

        queryClient.setQueryData(queryKeys.me, response);

        router.replace("/dashboard");
      } catch {
        router.replace("/login");
      }
    }

    void authenticate();
  }, [refreshMutateAsync, queryClient, router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">
        Finalizando autenticação...
      </p>
    </main>
  );
}