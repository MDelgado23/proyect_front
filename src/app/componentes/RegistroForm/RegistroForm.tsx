// RegistroForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../../../services/userService";
import styles from "../LoginForm/LoginForm.module.css"; // Reutilizo CSS

const FormularioRegistro = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newUser = { username, email, password };
      await createUser(newUser);
      setExito("Usuario registrado exitosamente!");
      setError("");
      router.push("/login");
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Fallo el registro");
      }
      setExito("");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        {error && <p className={styles["error-message"]}>{error}</p>}
        {exito && (
          <p className={styles["error-message"]} style={{ color: "green" }}>
            {exito}
          </p>
        )}
        <div className={styles["form-group"]}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <button type="submit">Registrarme</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;
