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
      <ul className="flex bg-teal-100 p-0 px-3 py-4 text-center">
        {navLinks.map((link) => {
          const isActive = pathName.startsWith(link.href);
          return (
            <li key={link.name} className="me-4">
              <Link
                href={link.href}
                className={`link ${isActive ? "text-blue-500" : ""}`}
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
