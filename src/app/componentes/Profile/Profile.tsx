"use client";

import React, { useState, useEffect } from "react";
import {
  getUserById,
  uploadProfileImage,
  deleteProfileImage,
  updatePassword,
} from "../../../services/userService";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa"; // Importamos los íconos
import styles from "./Profile.module.css";
import LogoutButton from "../LogoutButton/LogoutButton";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUserById(parseInt(userId))
        .then((data) => setUser(data))
        .catch(console.error);
    }
  }, []);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setProfileImage(selectedImage);

      // Cargar la imagen automáticamente después de seleccionarla
      try {
        const userId = parseInt(localStorage.getItem("userId") || "0");
        const response = await uploadProfileImage(userId, selectedImage);
        console.log("Image uploaded successfully:", response);
        const updatedUser = await getUserById(userId);
        setUser(updatedUser); // Actualiza el estado del usuario con la nueva imagen
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleImageDelete = async () => {
    if (user) {
      try {
        await deleteProfileImage(user.id);
        alert("Imagen eliminada con éxito");
        const updatedUser = await getUserById(user.id);
        setUser(updatedUser);
      } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        alert("Error al eliminar la imagen");
      }
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Las contraseñas nuevas no coinciden");
      return;
    }

    if (user) {
      try {
        await updatePassword(
          user.id,
          passwords.currentPassword,
          passwords.newPassword
        );
        alert("Contraseña actualizada con éxito");
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        alert("Error al actualizar la contraseña");
      }
    }
  };

  return (
    <div className={styles.container}>
      {user && (
        <>
          <h2>Perfil de Usuario</h2>
          <div className={styles.profileSection}>
            <div className={styles.imageSection}>
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className={styles.profileImage}
                />
              ) : (
                <p>No tienes una imagen de perfil</p>
              )}
              <div className={styles.imageButtons}>
                <label htmlFor="upload-button" className={styles.uploadButton}>
                  <FaPencilAlt />
                </label>
                <input
                  id="upload-button"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <button
                  className={styles.deleteButton}
                  onClick={handleImageDelete}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            <div className={styles.infoSection}>
              <p>Usuario: {user.username}</p>
              <p>Email: {user.email}</p>
              <LogoutButton />
            </div>
          </div>

          <div className={styles.passwordToggle}>
            <button
              className={styles.passwordButton}
              onClick={() => setShowPasswordSection(!showPasswordSection)}
            >
              Cambiar Contraseña {showPasswordSection ? "▲" : "▼"}
            </button>
          </div>
          {showPasswordSection && (
            <div className={styles.passwordSection}>
              <input
                type="password"
                placeholder="Contraseña Actual"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    currentPassword: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="Nueva Contraseña"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Repetir Nueva Contraseña"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <button
                className={styles.passwordUpdateButton}
                onClick={handlePasswordChange}
              >
                Actualizar Contraseña
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
