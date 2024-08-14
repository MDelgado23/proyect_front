"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./homebutton.module.css";

const HomeButton = () => {
  const router = useRouter();
  const home: string = "/";
  const handleHomeClick = () => {
    router.push(home);
  };

  return (
    <button className={styles.backButton} onClick={handleHomeClick}>
      Home
    </button>
  );
};

export default HomeButton;
