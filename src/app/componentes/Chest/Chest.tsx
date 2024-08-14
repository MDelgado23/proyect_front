"use client";
import React, { useState } from "react";
import { createBet } from "../../../services/betService";
import styles from "./Chest.module.css";
import PrizeModal from "../PrizeModal/PrizeModal";

interface ChestCompProps {
  selectedRouletteId: number | null;
  cost: number;
  onBet: (cost: number) => void;
  userCoins: number;
  openChestUrl: string;
  closedChestUrl: string;
}

const ChestComp: React.FC<ChestCompProps> = ({
  selectedRouletteId,
  cost,
  onBet,
  userCoins,
  openChestUrl,
  closedChestUrl,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [prizeName, setPrizeName] = useState<string | null>(null);
  const [prizeValue, setPrizeValue] = useState<number>(0);
  const [prizeImageUrl, setPrizeImageUrl] = useState<string | null>(null);

  const handleSpin = async () => {
    if (!selectedRouletteId || isSpinning || userCoins < cost) {
      if (userCoins < cost) {
        alert("No tienes suficientes monedas para abrir este cofre");
      }
      return;
    }

    setIsSpinning(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 2500);

    setTimeout(async () => {
      setIsSpinning(false);
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const bet = {
            amount: cost,
            userId: Number(userId),
            rouletteId: selectedRouletteId,
          };
          const result = await createBet(bet);

          onBet(cost);

          setPrizeName(result.prize.name);
          setPrizeValue(result.prize.value);
          setPrizeImageUrl(result.prize.imageUrl);
        }
      } catch (error) {
        console.error("Error creating bet:", error);
      }
    }, 3000);
  };

  const handleCloseModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPrizeName(null);
    setPrizeValue(0);
    setPrizeImageUrl(null);
    setIsOpen(false);
  };

  return (
    <div className={styles.chestContainer} onClick={handleSpin}>
      <img
        src={isOpen ? openChestUrl : closedChestUrl}
        alt={isOpen ? "Open Chest" : "Closed Chest"}
        className={`${styles.chestImage} ${isSpinning ? styles.spinning : ""}`}
      />
      {prizeName && (
        <PrizeModal
          prizeName={prizeName}
          prizeValue={prizeValue}
          prizeImageUrl={prizeImageUrl}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ChestComp;
