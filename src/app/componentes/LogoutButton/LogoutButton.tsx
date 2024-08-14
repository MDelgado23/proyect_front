"use client";
import { useRouter } from "next/navigation";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
  const router = useRouter();

  const handlerCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <button className={styles.button} onClick={handlerCerrarSesion}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
