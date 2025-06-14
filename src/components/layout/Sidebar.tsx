'use client'

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, MessageCircle, Users, Settings } from "lucide-react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Messages", href: "/messages", icon: MessageCircle },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Groups", href: "/groups", icon: Users },
];

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Sidebar */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className="p-2 m-2 border rounded md:hidden">Menu</SheetTrigger>
                <SheetContent side="left">
                    <nav className="">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                onClick={() => setOpen(false)}
                            >
                                <item.icon className="w-5 h-5 mr-2" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:flex-col w-64 h-screen border-r p-4">
                <h2 className="text-xl font-bold mb-8">JurNull</h2>
                <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                    <Link 
                        key={item.href} 
                        href={item.href} 
                        className="flex items-center gap-2"
                    >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                    </Link>
                ))}
                </nav>
            </div>
        </>
    );
}
