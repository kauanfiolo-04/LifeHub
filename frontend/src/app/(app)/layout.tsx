import Navbar from "@/components/app/navbar/navbar";
import Sidebar from "@/components/app/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar />

      <SidebarInset>
        <Navbar />

        <SidebarTrigger className="hidden md:flex" />

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}