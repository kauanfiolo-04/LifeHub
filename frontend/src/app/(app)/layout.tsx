import Navbar from "@/components/app/navbar/navbar";
import Sidebar from "@/components/app/sidebar";
import { ReactNode } from "react";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />

      <section className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </section>
    </div>
  );
}