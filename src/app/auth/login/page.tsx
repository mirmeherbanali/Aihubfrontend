"use client";

import styles from "@/components/ui/style/login.module.scss";
import AuthForm from "@/components/ui/auth/AuthForm";
import { useAuthToggle } from "@/context/AuthToggleContext";

export default function AuthPage() {
  const { isLogin, setIsLogin } = useAuthToggle();

  return (
    <div className={styles.pageWrapper}>
     <div className={styles.authCardGlow}></div>  
      <div className={styles.authCard}>
        
        {/* LEFT IMAGE */}
        <div className={styles.illustrationBox}>
          <img
            src="/assets/login.svg"
            alt="Illustration"
          />
        </div>

        {/* RIGHT FORM */}
        <div className={styles.formArea}>

          <h2 className={styles.title}>
            {isLogin ? "Login" : "Sign up"}
          </h2>

          <p className={styles.subtitle}>
            {isLogin
              ? "Login to access your account"
              : "Let’s get you all set up so you can access your personal account."}
          </p>

          <AuthForm />

          <div className={styles.switchText}>
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button onClick={() => setIsLogin(false)}>Sign up</button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsLogin(true)}>Login</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
