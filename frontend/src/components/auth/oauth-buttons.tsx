"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { Github01Icon, GoogleIcon } from "@hugeicons/core-free-icons";

export default function OAuthButtons() {
  const handleSubmit = (type: "github" | "google") => {
    window.location.href =
      `${process.env.NEXT_PUBLIC_API_URL}/auth/${type}`;
  }

return (
  <div className="flex flex-row gap-2 max-w-full">
    <Button className="flex flex-1 gap-2" size="lg" onClick={() => handleSubmit("github")}>
      <HugeiconsIcon icon={Github01Icon} width={32} />

      <span>GitHub</span>
    </Button>

    <Button className="flex flex-1 gap-2" size="lg" onClick={() => handleSubmit("google")}>
      <HugeiconsIcon icon={GoogleIcon} width={32} />

      <span>Google</span>
    </Button>
  </div>
);
}