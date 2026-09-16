import Navbar from "@/components/app/navbar";
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

        <SidebarTrigger className="hidden md:flex absolute" />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col w-full 2xl:max-w-330">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}