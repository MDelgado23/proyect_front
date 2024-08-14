"use client";

import React, { useEffect, useState } from "react";
import { getBetsByUserId } from "../../../services/betService";
import { Bet } from "../../../types/bet";
import styles from "./UserHistory.module.css";

const UserHistory: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const betsPerPage = 5; // Número de apuestas por página
  const userIdString = localStorage.getItem("userId");
  const userId: number = userIdString ? Number(userIdString) : 0;

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const data = await getBetsByUserId(userId);
        setBets(data);
      } catch (error) {
        console.error("Error fetching user bets:", error);
      }
    };

    fetchBets();
  }, [userId]);

  // Paginación
  const indexOfLastBet = currentPage * betsPerPage;
  const indexOfFirstBet = indexOfLastBet - betsPerPage;
  const currentBets = bets.slice(indexOfFirstBet, indexOfLastBet);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(bets.length / betsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    pageNumber: number
  ) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <h2>Mi Historial de Apuestas</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Premio</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {currentBets.map((bet) => (
            <tr key={bet.id}>
              <td>{bet.prize.name}</td>
              <td>{bet.amount}</td>
              <td>{new Date(bet.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={(event) => handleClick(event, number)}
            className={currentPage === number ? styles.activePage : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserHistory;
