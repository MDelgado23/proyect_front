"use client"

import React, { useState } from "react";
import Sidebar from "../componentes/SideBar/SideBar";
import UserManagement from "../componentes/UserManagement/UserManagement";
import PrizeManagement from "../componentes/PrizeManagement/PrizeManagement";
import ChestManagement from "../componentes/ChestManagement/ChestManagement";
import TransactionHistory from "../componentes/TransactionHistory/TransactionHistory";
import styles from "./page.module.css";
import withAuth from "../hoc/withAuth";

const AdminBeta: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>("");

  const renderSection = () => {
    switch (selectedSection) {
      case "users":
        return <UserManagement />;
      case "prizes":
        return <PrizeManagement />;
      case "chests":
        return <ChestManagement />;
      case "transactions":
        return <TransactionHistory />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar onSelect={setSelectedSection} />
      </div>
      <div className={styles.content}>{renderSection()}</div>
    </div>
  );
};

export default withAuth(AdminBeta, ["admin"]);
