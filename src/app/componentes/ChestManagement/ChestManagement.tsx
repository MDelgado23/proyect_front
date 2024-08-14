"use client";

import React, { useEffect, useState } from "react";
import {
  createChest,
  getChests,
  updateChest,
  deleteChest,
} from "../../../services/chestService";
import { Chest, RoulettePrize, Prize } from "../../../types/roulette";
import { getPrizes } from "../../../services/prizeService";
import styles from "./ChestManagement.module.css";

const ChestManagement: React.FC = () => {
  const [chests, setChests] = useState<Chest[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [selectedChest, setSelectedChest] = useState<Chest | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [openChestUrl, setOpenChestUrl] = useState<string>("");
  const [closedChestUrl, setClosedChestUrl] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [selectedPrizes, setSelectedPrizes] = useState<RoulettePrize[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    fetchChests();
    fetchPrizes();
  }, []);

  const fetchChests = async () => {
    try {
      const data = await getChests();
      setChests(data);
    } catch (error) {
      console.error("Error fetching chests:", error);
    }
  };

  const fetchPrizes = async () => {
    try {
      const data = await getPrizes();
      setPrizes(data);
    } catch (error) {
      console.error("Error fetching prizes:", error);
    }
  };

  const handleEditClick = (chest: Chest) => {
    setSelectedChest(chest);
    setName(chest.name);
    setDescription(chest.description);
    setOpenChestUrl(chest.openChestUrl);
    setClosedChestUrl(chest.closedChestUrl);
    setCost(chest.cost);
    setSelectedPrizes(
      chest.prizes.map((prize) => ({
        id: prize.id,
        prize: prize.prize,
        probability: prize.probability,
      }))
    );
    setIsCreating(false);
  };

  const handleSaveClick = async () => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      const probability = 100 / selectedPrizes.length;
      const updatedPrizes = selectedPrizes.map((prize) => ({
        prizeId: prize.prize.id,
        probability: probability,
      }));

      if (selectedChest) {
        await updateChest(selectedChest.id, {
          name,
          description,
          openChestUrl: openChestUrl,
          closedChestUrl: closedChestUrl,
          cost,
          prizes: updatedPrizes,
        });
      } else {
        await createChest({
          name,
          description,
          openChestUrl: openChestUrl,
          closedChestUrl: closedChestUrl,
          cost,
          createdBy: userId,
          prizes: updatedPrizes,
        });
      }

      setSelectedChest(null);
      setIsCreating(false);
      fetchChests();
    } catch (error) {
      console.error("Error updating chest:", error);
    }
  };

  const handleDeleteClick = async (chestId: number) => {
    try {
      await deleteChest(chestId);
      fetchChests();
    } catch (error) {
      console.error("Error deleting chest:", error);
    }
  };

  const handleCancelClick = () => {
    setSelectedChest(null);
    setIsCreating(false);
  };

  const handlePrizeSelectionChange = (prize: Prize, isSelected: boolean) => {
    if (isSelected) {
      const roulettePrize: RoulettePrize = {
        id: Date.now(),
        prize,
        probability: 0,
      };
      setSelectedPrizes([...selectedPrizes, roulettePrize]);
    } else {
      setSelectedPrizes(selectedPrizes.filter((p) => p.prize.id !== prize.id));
    }
  };

  const handleCreateClick = () => {
    setSelectedChest(null);
    setName("");
    setDescription("");
    setOpenChestUrl("");
    setClosedChestUrl("");
    setCost(0);
    setSelectedPrizes([]);
    setIsCreating(true);
  };

  return (
    <div className={styles.container}>
      <h2>Gestión de Cofres</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Imagen Cofre Abierto</th>
            <th>Imagen Cofre Cerrado</th>
            <th>Costo</th>
            <th className={styles.prizes}>Premios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {chests.map((chest) => (
            <tr key={chest.id}>
              <td>
                {selectedChest?.id === chest.id ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  chest.name
                )}
              </td>
              <td>
                {selectedChest?.id === chest.id ? (
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                ) : (
                  chest.description
                )}
              </td>
              <td>
                {selectedChest?.id === chest.id ? (
                  <input
                    type="text"
                    value={openChestUrl}
                    onChange={(e) => setOpenChestUrl(e.target.value)}
                  />
                ) : (
                  <img src={chest.openChestUrl} alt="Open Chest" width="50" />
                )}
              </td>
              <td>
                {selectedChest?.id === chest.id ? (
                  <input
                    type="text"
                    value={closedChestUrl}
                    onChange={(e) => setClosedChestUrl(e.target.value)}
                  />
                ) : (
                  <img
                    src={chest.closedChestUrl}
                    alt="Closed Chest"
                    width="50"
                  />
                )}
              </td>
              <td>
                {selectedChest?.id === chest.id ? (
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(parseInt(e.target.value))}
                    placeholder="Costo"
                  />
                ) : (
                  chest.cost
                )}
              </td>
              <td>
                {selectedChest?.id === chest.id ? (
                  <div>
                    {prizes.map((prize) => (
                      <label key={prize.id}>
                        <input
                          type="checkbox"
                          checked={selectedPrizes.some(
                            (p) => p.prize.id === prize.id
                          )}
                          onChange={(e) =>
                            handlePrizeSelectionChange(prize, e.target.checked)
                          }
                        />
                        {prize.name}
                      </label>
                    ))}
                  </div>
                ) : (
                  chest.prizes.map((prize) => prize.prize.name).join(", ")
                )}
              </td>
              <td>
                {selectedChest?.id === chest.id ? (
                  <>
                    <button onClick={handleSaveClick}>Guardar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(chest)}>
                      Editar
                    </button>
                    <button onClick={() => handleDeleteClick(chest.id)}>
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
                  placeholder="Nombre del cofre"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={openChestUrl}
                  onChange={(e) => setOpenChestUrl(e.target.value)}
                  placeholder="URL imagen abierta"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={closedChestUrl}
                  onChange={(e) => setClosedChestUrl(e.target.value)}
                  placeholder="URL imagen cerrada"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(parseInt(e.target.value))}
                  placeholder="Costo"
                />
              </td>
              <td>
                <div>
                  {prizes.map((prize) => (
                    <label key={prize.id}>
                      <input
                        type="checkbox"
                        checked={selectedPrizes.some(
                          (p) => p.prize.id === prize.id
                        )}
                        onChange={(e) =>
                          handlePrizeSelectionChange(prize, e.target.checked)
                        }
                      />
                      {prize.name}
                    </label>
                  ))}
                </div>
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
        Crear Nuevo Cofre
      </button>
    </div>
  );
};

export default ChestManagement;
