"use client"
import Link from "next/link";
import { JSX } from "react";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
}

export default function NavItem({ href, icon, label }: NavItemProps) {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      href={href}
      className={`min-w-[60px] sm:min-w-[80px] flex flex-col items-center px-2 sm:px-4 py-1 sm:py-2 rounded-full transition ${isActive ? "bg-white text-black" : "bg-black text-white"
        }`}
    >
      {icon}
      <span className="mt-1 text-xs sm:text-sm">{label}</span>
    </Link>
  )
}