"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/authStorage";
import styles from "../../ui/style/Navbar.module.scss";

export default function DesktopAuthLinks() {
 
   const token = getToken()
  return (
    <>
      {token ? (
        <Link href="/dashboard" className={styles.navItem}>
          Dashboard
        </Link>
      ) : (
        <Link href="/auth/login" className={styles.navItem}>
          Login
        </Link>
      )}
    </>
  );
}
