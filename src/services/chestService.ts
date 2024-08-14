import api from './api';

export const getChests = async () => {
  const response = await api.get('/chests');
  return response.data;
};

export const getChestsDel = async () => {
  const response = await api.get('/chests/deleted');
  return response.data;
};

export const createChest = async (chest: {
  name: string;
  description: string;
  openChestUrl: string;
  closedChestUrl: string;
  cost: number;
  createdBy: number;
  prizes: { prizeId: number; probability: number }[];
}) => {
  const response = await api.post('/chests', chest);
  return response.data;
};

export const updateChest = async (id: number, chest: {
  name: string;
  description: string;
  openChestUrl: string;
  closedChestUrl: string;
  cost: number;
  prizes: { prizeId: number; probability: number }[];
}) => {
  const response = await api.patch(`/chests/${id}`, chest);
  return response.data;
};

export const deleteChest = async (id: number) => {
  const response = await api.delete(`/chests/${id}`);
  return response.data;
};

export const getPrizes = async () => {
  const response = await api.get('/prizes');
  return response.data;
};
