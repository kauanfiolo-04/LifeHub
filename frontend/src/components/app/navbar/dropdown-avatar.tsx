"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner";
import { useLogout } from "@/hooks/auth/useLogout";
import { useMe } from "@/hooks/auth/useMe"
import { queryKeys } from "@/lib/query-keys";
import { AccountSetting03Icon, Logout03Icon, NerdIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function DropdownMenuAvatar() {
  const { data: user, isPending: userPending } = useMe();

  const router = useRouter();

  const queryClient = useQueryClient();
  
  const { mutateAsync: logout, isPending: logPending } = useLogout();

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response.success) {
        localStorage.removeItem("accessToken");

        queryClient.removeQueries({
          queryKey: queryKeys.me,
        });
        
        router.replace("/");}
    } catch (error) {
      console.error(error);
    }
  };

  const userName = (() => {
    if (!user) return (
      <HugeiconsIcon icon={NerdIcon} />
    );

    const name = user.name;

    const [F, L] = name.split(" ").map(text => text.charAt(0));

    return L ? `${F}${L}` : F;
  })();

  useEffect(() => {
    if (!userPending && !user) {
      router.replace("/login");
    }
  }, [user, userPending, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" /> */}
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/account")}>
            <HugeiconsIcon icon={AccountSetting03Icon} />
            Account
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          {logPending ? (
            <Spinner />
          ) : (
            <HugeiconsIcon icon={Logout03Icon} />
          )}
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
