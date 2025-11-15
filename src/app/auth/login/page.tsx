"use client";

import styles from "@/components/ui/style/login.module.scss";
import AuthForm from "@/components/ui/auth/AuthForm";
import SocialLoginButtons from "@/components/ui/auth/SocialLoginButtons";
import { useAuthToggle } from "@/context/AuthToggleContext";

export default function AuthPage() {
  const { isLogin, setIsLogin } = useAuthToggle();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src="/assets/logo.jpg" alt="Logo" style={{ height: 55 }} />
        </div>

        <h2 className={styles.title}>
          {isLogin ? "Sign in" : "Create Account"}
        </h2>
        <p className={styles.subtitle}>
          {isLogin
            ? "to continue to your account"
            : "Join us by creating an account"}
        </p>

        <AuthForm />

        <div className={styles.or}>
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        {/* <SocialLoginButtons /> */}

        <p className={styles.footer}>
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button type="button" onClick={() => setIsLogin(false)}>
                Create account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => setIsLogin(true)}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
