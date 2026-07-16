import { DropdownMenuAvatar } from "./dropdown-avatar";

export default function Navbar() {
  return (
    <header className="h-14 w-full border-b flex items-center justify-between px-4 fixed bg-white">
      <h1 className="font-medium">LifeHub</h1>

      <DropdownMenuAvatar />
    </header>
  );
}