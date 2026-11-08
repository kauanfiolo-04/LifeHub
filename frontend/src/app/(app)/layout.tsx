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

        <main className="flex flex-col flex-1 p-6 3xl:p-8 pt-20 md:pt-6 3xl:pt-8 overflow-y-auto">
          <div className="flex flex-col flex-1 w-full 3xl:max-w-300 3xl:ml-12">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}