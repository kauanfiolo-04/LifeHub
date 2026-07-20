import Navbar from "@/components/app/navbar/navbar";
import Link from "next/link";
import { ReactNode } from "react";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 hidden md:block">
        <h2 className="font-bold text-lg mb-6">LifeHub</h2>

        <nav className="flex flex-col gap-2">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/finance">Finance</Link>
          <Link href="/notes">Notes</Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-6 pt-20">{children}</main>
      </div>
    </div>
  );
}