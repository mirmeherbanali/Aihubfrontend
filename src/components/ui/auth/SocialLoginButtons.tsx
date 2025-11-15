"use client";

import { signIn } from "next-auth/react";
import styles from "../style/login.module.scss";

const providers = [
  { name: "google", icon: "/icons/google.svg" },
  { name: "github", icon: "/icons/github.svg" },
];

export default function SocialLoginButtons() {
  return (
    <div className={styles.socialsRow}>
      {providers.map((p) => (
        <button
          key={p.name}
          type="button"
          className={styles[p.name]}
          onClick={() => signIn(p.name)}
        >
          <img src={p.icon} alt={p.name} />
          {/* <span>{p.label}</span> */}
        </button>
      ))}
    </div>
  );
}
