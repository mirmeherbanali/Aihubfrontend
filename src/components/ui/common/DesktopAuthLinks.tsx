"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/authStorage";
import styles from "../../ui/style/Navbar.module.scss";
import { usePathname } from "next/navigation";

export default function DesktopAuthLinks() {
   const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? styles.active : "";
   const token = getToken()
  return (
    <>
      {token ? (
        <Link href="/dashboard" className={`${styles.navItem} ${isActive("/dashboard")}`}>
          Dashboard
        </Link>
      ) : (
        <Link href="/auth/login" className={`${styles.navItem} ${isActive("/auth/login")}`}>
          Login
        </Link>
      )}
    </>
  );
}
