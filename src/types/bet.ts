import { Usuario } from './user';
import { Prize } from './prize';

export interface Bet {
  id: number;
  amount: number;
  createdAt: string;
  user: Usuario;
  prize: Prize;
  rouletteId: number; 
}
