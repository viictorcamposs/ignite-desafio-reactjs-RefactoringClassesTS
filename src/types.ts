export interface Food {
  id: number;
  price: number;
  name: string;
  description: string;
  image: string;
  available: boolean;
};

export type FoodInput = Omit<Food, 'id' | 'available'>;