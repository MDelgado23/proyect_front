import React from "react";
import RootLayout from "./layout";
import Navbar from "./componentes/NavBar/navbar";
import styles from "./page.module.css";

const HomePage = () => {
  return (
    <RootLayout>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.content}>
          <h1>Bienvenido a MUBet</h1>
        </div>
      </div>
    </RootLayout>
  );
};

export default HomePage;
