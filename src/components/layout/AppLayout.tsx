import { ReactNode } from "react";
import { Toaster } from "sonner";
import Sidebar from "./Sidebar";
import UserNav from "./UserNav";
import ThemeToggle from "./ThemeToggle";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
            <header className="flex items-center justify-between px4 py-2 border-b">
                <div className="text-lg font-bold">JurNull</div>
                <div className="flex items-center gap-4">
                    <UserNav />
                    <ThemeToggle />
                </div>
            </header>
            <main className="flex-1 p-4">{children}</main>
            <Toaster richColors position="bottom-right" />
        </div>
    </div>
  );
}