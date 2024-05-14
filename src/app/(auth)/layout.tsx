"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
  { name: "Forgot Password", href: "/forgot-password" },
];

function AuthRootLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  return (
    <>
      <ul className="px-3 py-4 text-center flex bg-teal-100 p-0">
        {navLinks.map((link) => {
          const isActive = pathName.startsWith(link.href);
          return (
            <li key={link.name} className="me-4">
              <Link
                href={link.href}
                className={`mr-4 ${isActive ? "font-bold underline" : "text-blue-500 no-underline"}`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      {children}
    </>
  );
}

export default AuthRootLayout;
