"use client";
import React, { useEffect, useState } from "react";
import { getChests } from "../../../services/chestService";
import { Chest } from "../../../types/roulette";
import ChestComp from "../Chest/Chest";
import styles from "./RouletteList.module.css";

interface RouletteListProps {
  onBet: (cost: number) => void;
  userCoins: number;
}

const RouletteList: React.FC<RouletteListProps> = ({ onBet, userCoins }) => {
  const [roulettes, setRoulettes] = useState<Chest[]>([]);
  const [selectedRoulette, setSelectedRoulette] = useState<Chest | null>(null);

  useEffect(() => {
    const fetchRoulettes = async () => {
      try {
        const data = await getChests();
        setRoulettes(data);
      } catch (error) {
        console.error("Error fetching roulettes:", error);
      }
    };

    fetchRoulettes();
  }, []);

  const handleSelectRoulette = (roulette: Chest) => {
    setSelectedRoulette(roulette);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rouletteList}>
        {roulettes.map((roulette, index) => (
          <React.Fragment key={roulette.id}>
            <div
              onClick={() => handleSelectRoulette(roulette)}
              className={styles.rouletteItem}
            >
              {/* Mostrar imagen solo si el Chest no está seleccionado */}
              {(!selectedRoulette || selectedRoulette.id !== roulette.id) && (
                <img
                  src={roulette.closedChestUrl}
                  alt={roulette.name}
                  className={styles.rouletteImage}
                />
              )}
              <h3>{roulette.name}</h3>
            </div>
            {/* Agregar una línea separadora */}
            {index < roulettes.length - 1 && (
              <div className={styles.separator}></div>
            )}
            {selectedRoulette && selectedRoulette.id === roulette.id && (
              <div className={styles.chestWrapper}>
                <p>Costo: {roulette.cost} monedas</p>
                <ChestComp
                  selectedRouletteId={selectedRoulette.id}
                  cost={selectedRoulette.cost}
                  onBet={onBet}
                  userCoins={userCoins}
                  openChestUrl={selectedRoulette.openChestUrl}
                  closedChestUrl={selectedRoulette.closedChestUrl}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RouletteList;
