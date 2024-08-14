"use client";

import React, { useEffect, useState } from "react";
import withAuth from "../../hoc/withAuth";
import styles from "./UserPanel.module.css";
import { useRouter } from "next/navigation";
import { getUserById, updateUserCoins } from "../../../services/userService";
import Modal from "../Modal/Modal";
import RouletteList from "../RouletteList/RouletteList";
import UserHistory from "../UserHistory/UserHistory";
import Profile from "../Profile/Profile";

const PaginaUsuarios = () => {
  const [userRole, setUserRole] = useState<string>("");
  const [coins, setCoins] = useState<number>(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showRouletteModal, setShowRouletteModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");
    if (role) {
      setUserRole(role);
    } else {
      setUserRole("user");
    }

    if (userId) {
      getUserById(Number(userId))
        .then((response) => {
          if (response && response.coins) {
            setCoins(response.coins);
          } else {
            console.error(
              "No se encontraron monedas en la respuesta:",
              response
            );
          }
          if (response && response.profileImageUrl) {
            setProfileImage(response.profileImageUrl);
          } else {
            setProfileImage(null);
          }
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, []);

  const handleBackClick = () => {
    console.log("Back button clicked");
  };

  const handleAdmBtn = () => {
    router.push("/adminBeta");
  };

  const handleJugarClick = () => {
    setShowRouletteModal(true);
  };

  const handleBet = async (cost: number) => {
    const newCoins = coins - cost;
    setCoins(newCoins);

    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        await updateUserCoins(Number(userId), newCoins);
      } catch (error) {
        console.error("Error al actualizar las monedas:", error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.panel}>
        <div className={styles.navbar}>
          <button className={styles.navButton}>{`${coins} Coins`}</button>
          <button
            className={styles.profileButton}
            onClick={() => setShowProfileModal(true)}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className={styles.profileImage}
              />
            ) : (
              "+"
            )}
          </button>
          {userRole === "admin" && (
            <button className={styles.navButton} onClick={handleAdmBtn}>
              ADM PANEL
            </button>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleJugarClick}>
            ABRIR CHEST
          </button>
          <button className={styles.button}>RECARGAR MONEDAS</button>
          <button
            className={styles.button}
            onClick={() => setShowHistoryModal(true)}
          >
            HISTORIAL DE PREMIOS
          </button>
          <button
            className={styles.button}
            style={{ backgroundColor: "#FF6347" }}
          >
            PRÓXIMAMENTE
          </button>
        </div>
      </div>

      {showRouletteModal && (
        <Modal
          isOpen={showRouletteModal}
          onClose={() => setShowRouletteModal(false)}
        >
          <div className={styles.modalContent}>
            <RouletteList onBet={handleBet} userCoins={coins} />
          </div>
        </Modal>
      )}

      {showHistoryModal && (
        <Modal
          isOpen={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
        >
          <div className={styles.modalContent}>
            <UserHistory />
          </div>
        </Modal>
      )}

      {showProfileModal && (
        <Modal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
        >
          <div className={styles.modalContent}>
            <Profile />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default withAuth(PaginaUsuarios, ["user", "admin"]);
