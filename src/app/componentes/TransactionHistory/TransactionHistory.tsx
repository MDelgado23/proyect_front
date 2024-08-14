"use client";

import React, { useEffect, useState } from "react";
import { getBets } from "../../../services/betService";
import { Bet } from "../../../types/bet";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import styles from "./TransactionHistory.module.css";

const TransactionHistory: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const betsPerPage = 10;

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const data = await getBets();
        setBets(data);
      } catch (error) {
        console.error("Error fetching bets:", error);
      }
    };

    fetchBets();
  }, []);

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);

    const tableColumn = ["Cofre ID", "Usuario", "Premio", "Monto", "Fecha"];
    const tableRows: any[] = [];

    bets.forEach((bet) => {
      const betData = [
        bet.rouletteId,
        bet.user.username,
        bet.prize.name,
        bet.amount,
        new Date(bet.createdAt).toLocaleString(),
      ];
      tableRows.push(betData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 10 }, // Ajusta el tamaño de la fuente en la tabla
    });

    doc.save("transaction_history.pdf");
  };

  return (
    <div className={styles.container}>
      <h2>Historial de Transacciones</h2>
      <button onClick={downloadPDF} className={styles.downloadButton}>
        Descargar PDF
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cofre ID</th>
            <th>Usuario</th>
            <th>Premio</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {currentBets.map((bet) => (
            <tr key={bet.id}>
              <td>{bet.rouletteId}</td>
              <td>{bet.user.username}</td>
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

export default TransactionHistory;
