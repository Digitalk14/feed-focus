"use client"
import { logout } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/feeds", label: "Feeds" },
  { href: "/ads", label: "Ads" },
];

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-100px)] gap-4">
      <nav className="space-y-4">
        {links.map((link) => (
          <Link
          className={`flex items-center space-x-3 p-2 ${
            pathname.includes(link.href)
              ? "bg-[#585DFF] text-white rounded-[10px]"
              : "text-gray-700 hover:text-gray-900"
          }`}
          href={link.href}
          key={link.href}
        >
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <button className="text-[#333] text-sm text-left" onClick={logout}>Logout</button>
    </div>
  );
};
