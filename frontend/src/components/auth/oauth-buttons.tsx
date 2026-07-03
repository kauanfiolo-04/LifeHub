import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { Github01Icon, GoogleIcon } from "@hugeicons/core-free-icons";

export default function OAuthButtons() {
  return (
    <div className="flex flex-row gap-2 max-w-full">
      <Button className="flex flex-1 gap-2" size="lg">
        <HugeiconsIcon icon={Github01Icon} width={32} />

        <span>GitHub</span>
      </Button>

      <Button className="flex flex-1 gap-2" size="lg">
        <HugeiconsIcon icon={GoogleIcon} width={32} />

        <span>Google</span>
      </Button>
    </div>
  );
}