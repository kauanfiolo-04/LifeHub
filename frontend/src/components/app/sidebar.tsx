import Link from "next/link";
import { DropdownMenuAvatar } from "./navbar/dropdown-avatar";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-4 hidden md:block">
      <div className="flex justify-between items-center w-full mb-6">
        <h2 className="font-bold text-lg">LifeHub</h2>

        <DropdownMenuAvatar />
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/finance">Finance</Link>
        <Link href="/notes">Notes</Link>
      </nav>
    </aside>
  );
}