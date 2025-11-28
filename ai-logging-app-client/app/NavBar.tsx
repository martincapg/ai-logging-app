"use client";
import React from "react";
import { useLogActivityModal } from "./LogActivityModalProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import InsightsIcon from "@mui/icons-material/Insights";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

const navItems = [
  { href: "/", label: "Home", icon: <HomeIcon fontSize="medium" /> },
  { href: "/goals", label: "Goals", icon: <FlagIcon fontSize="medium" /> },
  { href: "/insights", label: "Insights", icon: <InsightsIcon fontSize="medium" /> },
  { href: "/profile", label: "Profile", icon: <PersonIcon fontSize="medium" /> },
];

export default function NavBar() {
  const pathname = usePathname();
  const logActivityModal = useLogActivityModal();

  // Accept an optional prop for FAB click
  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center h-16 z-40 shadow-lg px-6">
      <div className="flex gap-8 items-center">
        {/* Logo/Name */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-700 dark:text-blue-400 select-none">
          <span role="img" aria-label="logo">🎯</span>
          GoalPilot
        </Link>
        {/* Navigation Items */}
        <div className="flex gap-6 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/" && pathname === "");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center text-xs px-2 py-1 rounded-md transition-colors
                  ${isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"}`}
              >
                {/* Clone icon and apply color if active */}
                {isActive
                  ? React.cloneElement(item.icon, { style: { color: '#2563eb' } })
                  : item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
      {/* Floating Action Button (FAB) */}
      <button
        className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center text-2xl border-4 border-white dark:border-zinc-900"
        onClick={logActivityModal.open}
        aria-label="Log Activity"
      >
        <AddIcon fontSize="large" />
      </button>
    </nav>
  );
}
