"use client";

import React, { useEffect, useState } from "react";
import {
  getPrizes,
  updatePrizeName,
  updatePrizeValue,
  updatePrizeImgUrl,
  createPrize,
  deletePrize,
} from "../../../services/prizeService";
import { Prize } from "../../../types/prize";
import styles from "./PrizeManagement.module.css";

const PrizeManagement: React.FC = () => {
  const [prizeList, setPrizeList] = useState<Prize[]>([]);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    try {
      const data = await getPrizes();
      setPrizeList(data);
    } catch (error) {
      console.error("Error fetching prizes:", error);
    }
  };

  const handleEditClick = (prize: Prize) => {
    setSelectedPrize(prize);
    setName(prize.name);
    setValue(prize.value);
    setImageUrl(prize.imageUrl);
    setIsCreating(false);
  };

  const handleSaveClick = async () => {
    try {
      if (selectedPrize) {
        await updatePrizeName(selectedPrize.id, name);
        await updatePrizeValue(selectedPrize.id, value);
        await updatePrizeImgUrl(selectedPrize.id, imageUrl);
      } else {
        await createPrize({ name, value, imageUrl });
      }
      setSelectedPrize(null);
      setIsCreating(false);
      fetchPrizes();
    } catch (error) {
      console.error("Error updating or creating prize:", error);
    }
  };

  const handleCancelClick = () => {
    setSelectedPrize(null);
    setIsCreating(false);
  };

  const handleCreateClick = () => {
    setSelectedPrize(null);
    setName("");
    setValue(0);
    setImageUrl("");
    setIsCreating(true);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await deletePrize(id);
      fetchPrizes();
    } catch (error) {
      console.error("Error deleting prize:", error);
      alert("El premio es parte de un Chest, no se puede borrar.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gestión de Premios</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prizeList.map((prize) => (
            <tr key={prize.id}>
              <td>
                {selectedPrize?.id === prize.id ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  prize.name
                )}
              </td>
              <td>
                {selectedPrize?.id === prize.id ? (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(parseInt(e.target.value))}
                  />
                ) : (
                  prize.value
                )}
              </td>
              <td>
                {selectedPrize?.id === prize.id ? (
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                ) : (
                  <img src={prize.imageUrl} alt={prize.name} width="50" />
                )}
              </td>
              <td>
                {selectedPrize?.id === prize.id ? (
                  <>
                    <button onClick={handleSaveClick}>Guardar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(prize)}>
                      Editar
                    </button>
                    <button onClick={() => handleDeleteClick(prize.id)}>
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {isCreating && (
            <tr>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre del premio"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(parseInt(e.target.value))}
                  placeholder="Valor"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL de la imagen"
                />
              </td>
              <td>
                <button onClick={handleSaveClick}>Guardar</button>
                <button onClick={handleCancelClick}>Cancelar</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleCreateClick} className={styles.createButton}>
        Crear Nuevo Premio
      </button>
    </div>
  );
};

export default PrizeManagement;
