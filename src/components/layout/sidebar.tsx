"use client";

import {
  Home,
  MessageSquare,
  PieChart,
  Clock,
  HelpCircle,
  Settings,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: MessageSquare, label: "Chats", href: "/chats" },
    { icon: PieChart, label: "Reports", href: "/reports" },
    { icon: Clock, label: "Schedule", href: "/schedule" },
  ];

  const bottomItems = [
    { icon: HelpCircle, label: "Help", href: "/help" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href);

  return (
    <div className="w-20 bg-white border-r border-neutral-br-secondary flex flex-col items-center py-6">
      {/* Add Button */}
      <button className="w-10 h-10 bg-brand-default rounded-full flex items-center justify-center text-white hover:bg-brand-active transition-colors">
        <Plus size={20} />
      </button>
      <div className="px-2 w-full">
        <Separator className="my-6 " />
      </div>
      {/* Navigation Items */}
      <div className="flex-1 flex flex-col gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive(item.href)
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="flex flex-col gap-6 mt-auto">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive(item.href)
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
