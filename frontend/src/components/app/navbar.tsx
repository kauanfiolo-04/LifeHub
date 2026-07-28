"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import { DropdownMenuAvatar } from "./dropdown-avatar";
import { Menu02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

export default function Navbar() {
  const { setOpenMobile } = useSidebar();

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 md:hidden">
      <Button variant="ghost" size="icon-lg" onClick={() => setOpenMobile(true)}>
        <HugeiconsIcon icon={Menu02Icon} size={30}/>
      </Button>

      <Link href={"/dashboard"}>
        <h1 className="font-bold">LifeHub</h1>
      </Link>

      <DropdownMenuAvatar />
    </header>
  );
}