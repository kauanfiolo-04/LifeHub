"use client";

import Link from "next/link";
import { DropdownMenuAvatar } from "./dropdown-avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "../ui/sidebar";
import { AcuteIcon, Cancel01Icon, ArrowDown01Icon, Note01Icon, Task01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { IconSvgObject } from "@/types/common";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface MenuItem {
  title: string;
  url: string;
  icon?: IconSvgObject;
  children?: Omit<MenuItem, "children" | "icon">[];
}

const items: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: undefined,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: Task01Icon,
    children: [
      {
        title: "All",
        url: "/tasks"
      },
      {
        title: "Create Task",
        url: "/tasks/new"
      }
    ]
  },
  {
    title: "Finance",
    url: "/finance",
    icon: undefined,
  },
  {
    title: "Notes",
    url: "/notes",
    icon: Note01Icon,
    children: [
      {
        title: "All",
        url: "/notes"
      },
      {
        title: "Create Note",
        url: "/notes/new"
      }
    ]
  },
];

export default function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between">
        <SidebarMenuBadge className="justify-start static">
          <p className="text-lg font-bold">
            LifeHub
          </p>
        </SidebarMenuBadge>

        {isMobile && (
          <Button variant="ghost" size="icon-lg" onClick={() => setOpenMobile(false)}>
            <HugeiconsIcon icon={Cancel01Icon} />
          </Button>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => !!item.children ? (
                <Collapsible key={item.title}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className="group cursor-pointer">
                        <HugeiconsIcon icon={item.icon ?? AcuteIcon} size={16} />

                        <span>{item.title}</span>

                        <div
                          className="ml-auto transition-transform group-data-[state=open]:rotate-180"
                        >
                          <HugeiconsIcon 
                            icon={ArrowDown01Icon} 
                            size={14} 
                          />
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children.map((child, idx) => (
                          <SidebarMenuSubItem key={idx}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={child.url}
                                onClick={() => { if (isMobile) setOpenMobile(false) }}
                              >
                                <span>{child.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.url}
                      onClick={() => { if (isMobile) setOpenMobile(false) }}
                    >
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

      {!isMobile && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <DropdownMenuAvatar />

              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}