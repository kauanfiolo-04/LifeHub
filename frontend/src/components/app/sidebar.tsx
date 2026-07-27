import Link from "next/link";
import { DropdownMenuAvatar } from "./navbar/dropdown-avatar";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "../ui/sidebar";
import { ClipboardPenLineIcon, AcuteIcon, AccountSetting03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AppSidebar() {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: undefined,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: undefined,
    },
    {
      title: "Finance",
      url: "/finance",
      icon: undefined,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: ClipboardPenLineIcon,
    },
  ];
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h2 className="px-2 text-lg font-bold">
          LifeHub
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <HugeiconsIcon icon={item.icon ?? AcuteIcon} size={16} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Configurações">
              <Link href="/settings">
                <HugeiconsIcon icon={AccountSetting03Icon} size={16} />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <DropdownMenuAvatar />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}