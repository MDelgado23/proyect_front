"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("/registro");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MUBet</div>
      <div className={styles.navButtons}>
        <button onClick={handleLoginClick} className={styles.navButton}>
          Login
        </button>
        <button onClick={handleRegisterClick} className={styles.navButton}>
          Registro
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
