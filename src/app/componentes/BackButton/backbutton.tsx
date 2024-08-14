"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./BackButton.module.css";

const BackButton = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <button className={styles.backButton} onClick={handleBackClick}>
      ← Volver
    </button>
  );
};

export default BackButton;
