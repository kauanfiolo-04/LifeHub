import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-4 hidden md:block">
      <h2 className="font-bold text-lg mb-6">LifeHub</h2>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/finance">Finance</Link>
        <Link href="/notes">Notes</Link>
      </nav>

      <
    </aside>
  );
}