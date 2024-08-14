import React from "react";
import styles from "./Sidebar.module.css";
import { useRouter } from "next/navigation";

interface SidebarProps {
  onSelect: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const router = useRouter();
  return (
    <div className={styles.sidebar}>
      <button onClick={() => onSelect("users")}>Gestion de Usuarios</button>
      <button onClick={() => onSelect("prizes")}>Gestion de Premios</button>
      <button onClick={() => onSelect("chests")}>Gestion de Chest</button>
      <button onClick={() => onSelect("transactions")}>
        Historial de Transacciones
      </button>

      <button onClick={() => router.push("/user")}>UserPanel</button>
    </div>
  );
};

export default Sidebar;
