"use client";

import React, { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  updateUserCoins,
  updateUserEmail,
  updateUserUsername,
} from "../../../services/userService";
import { Usuario } from "../../../types/user";
import styles from "./UserManagement.module.css";

const UserManagement: React.FC = () => {
  const [userList, setUserList] = useState<Usuario[]>([]);
  const [editUserById, setEditUserById] = useState<any | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [coins, setCoins] = useState<number>(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUserList(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditClick = (user: Usuario) => {
    setEditUserById(user.id.toString());
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
    setCoins(user.coins);
  };

  const handleSaveClick = async () => {
    try {
      if (editUserById) {
        await updateUserUsername(editUserById, username);
        await updateUserEmail(editUserById, email);
        await updateUserRole(editUserById, role);
        await updateUserCoins(editUserById, coins);
        setEditUserById(null);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancelClick = () => {
    setEditUserById(null);
  };

  return (
    <div className={styles.container}>
      <h2>Gestión de Usuarios</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th >Nombre de usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Coins</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>
                {editUserById === user.id.toString() ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editUserById === user.id.toString() ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editUserById === user.id.toString() ? (
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editUserById === user.id.toString() ? (
                  <input
                    type="number"
                    value={coins}
                    onChange={(e) => setCoins(parseInt(e.target.value))}
                  />
                ) : (
                  user.coins
                )}
              </td>
              <td>
                {editUserById === user.id.toString() ? (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
