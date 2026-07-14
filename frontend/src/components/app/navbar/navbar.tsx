import { DropdownMenuAvatar } from "./dropdown-avatar";

export default function Navbar() {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4">
      <h1 className="font-medium">LifeHub</h1>

      <DropdownMenuAvatar />
    </header>
  );
}