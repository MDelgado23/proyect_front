import React from "react";
import styles from "./PrizeModal.module.css";

interface PrizeModalProps {
  prizeName: string;
  prizeValue: number;
  prizeImageUrl: string | null;
  onClose: (event: React.MouseEvent) => void;
}

const PrizeModal: React.FC<PrizeModalProps> = ({
  prizeName,
  prizeValue,
  prizeImageUrl,
  onClose,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Ganaste: {prizeName}</h2>
        <h2>Valor: {prizeValue}</h2>
        {prizeImageUrl && (
          <img
            src={prizeImageUrl}
            alt={prizeName}
            className={styles.prizeImage}
          />
        )}
      </div>
    </div>
  );
};

export default PrizeModal;
