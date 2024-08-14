"use client";

import React from "react";
import UserPanel from "../componentes/UserPanel/UserPanel";
import styles from "./page.module.css";

const User = () => {
  return (
    <div className={styles.background}>
      <UserPanel />
    </div>
  );
};

export default User;
