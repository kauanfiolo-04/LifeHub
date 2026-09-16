"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl lg:text-4xl font-bold">LifeHub</h1>

      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        <h2 className="text-xl">
          Organize your life in just one place.
        </h2>

        <p>
          Tasks and notes in a simple and intuitive experience.
        </p>

        <p>If you like the idea you should register an account and start using</p>

        <div className="flex flex-col gap-2 w-80">
          <Button className="w-full" onClick={() => router.push("/register")}>
            Register
          </Button>

          <Button className="w-full" onClick={() => router.push("/login")}>
            Sign in
          </Button>
        </div>
      </div>
    </main>
  );
}