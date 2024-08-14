import api from './api';
import { Bet } from '../types/bet';

export const getBets = async (): Promise<Bet[]> => {
  const response = await api.get('/bets');
  return response.data;
};

export const getBetsByUserId = async (userId: number): Promise<Bet[]> => {
  try {
    const response = await api.get(`/bets/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bets by userId:', error);
    throw error;
  }
};

export const createBet = async (bet: { amount: number; userId: number; rouletteId: number }): Promise<Bet> => {
  const response = await api.post('/bets', bet);
  return response.data;
};
