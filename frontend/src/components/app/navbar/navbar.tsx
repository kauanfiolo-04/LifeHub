import { DropdownMenuAvatar } from "./dropdown-avatar";

export default function Navbar() {
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 md:hidden">
      <h1 className="font-medium">LifeHub</h1>

      <DropdownMenuAvatar />
    </header>
  );
}