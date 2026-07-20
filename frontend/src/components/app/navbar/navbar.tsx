import { DropdownMenuAvatar } from "./dropdown-avatar";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b bg-background flex items-center justify-between px-4">
      <h1 className="font-medium">LifeHub</h1>

      <DropdownMenuAvatar />
    </header>
  );
}