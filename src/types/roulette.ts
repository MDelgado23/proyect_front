export interface RoulettePrize {
  id: number;
  prize: Prize;
  probability: number;
}

export interface Prize {
  id: number;
  name: string;
  value: number;
}

export interface SelectedPrize {
  prizeId: number;
  probability: number;
}

export interface Chest {
  id: number;
  name: string;
  description: string;
  openChestUrl: string;
  closedChestUrl: string;
  cost: number;
  prizes: RoulettePrize[];
}
