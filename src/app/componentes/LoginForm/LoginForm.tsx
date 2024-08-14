"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { iniciarSesion } from "../../../services/userService";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const credenciales = { username, password };
      const response = await iniciarSesion(credenciales);
      console.log("Login response:", response); // Verificacion
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("userRole", response.role);
      localStorage.setItem("userId", response.id);
      if (response.role === "admin") {
        router.push("/adminBeta");
      } else {
        router.push("/user");
      }
      setError("");
    } catch (error) {
      setError("Credenciales inválidas");
      console.error("Error durante el inicio de sesión:", error);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <div className={styles["form-group"]}>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <div className={styles["form-group"]}>
            <input
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles["form-group"]}>
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
