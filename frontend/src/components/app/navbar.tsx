"use client";

import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu02Icon } from "@hugeicons/core-free-icons";
import { DropdownMenuAvatar } from "./dropdown-avatar";
import Link from "next/link";

export default function Navbar() {
  const { setOpenMobile } = useSidebar();

  return (
    <header className="fixed top-0 left-0 z-50 flex h-14 w-full items-center justify-between border-b bg-background px-4 md:hidden">
      <Button
        variant="ghost"
        size="icon-lg"
        onClick={() => setOpenMobile(true)}
      >
        <HugeiconsIcon icon={Menu02Icon} size={30} />
      </Button>

      <Link href="/dashboard">
        <h1 className="font-bold">LifeHub</h1>
      </Link>

      <DropdownMenuAvatar />
    </header>
  );
}