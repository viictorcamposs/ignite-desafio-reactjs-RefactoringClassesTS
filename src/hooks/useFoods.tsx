import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

import api from "../services/api";
import { Food, FoodInput } from "../types";

interface FoodsContextData {
  foods: Food[],
  createFood: (input: FoodInput) => Promise<void>,
  updateFood: (id: number, food: FoodInput) => Promise<void>,
  deleteFood: (id: number) => Promise<void>;
};

interface FoodsProviderProps {
  children: ReactNode;
};

const FoodsContext = createContext<FoodsContextData>(
  {} as FoodsContextData
);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function getFoods() {
      const response = await api.get('foods');
      const { data } = response;

      setFoods(data);
    };

    getFoods();
  }, []);

  const createFood = async (foodInput: FoodInput): Promise<void> => {
    try {
      const response = await api.post('foods', {
        ...foodInput,
        available: true,
      });

      setFoods([...foods, response.data]);

      toast.success('Prato criado com sucesso.');
    } catch {
      toast.error('Não foi possível criar prato. Tente novamente mais tarde.');
    }
  };

  const updateFood = async (foodId: number, food: FoodInput): Promise<void> => {
    const foodExists = foods.find(food => food.id === foodId);

    if (!foodExists) {
      toast.error('Error ao tentar atualizar prato. Tente novamente.');
      return;
    };

    try {
      const foodUpdated = await api.put<Food>(`/foods/${foodId}`, {
        ...foodExists,
        ...food
      });

      const foodsUpdated = foods.map(food => 
        food.id === foodUpdated.data.id ? foodUpdated.data : food  
      );

      setFoods(foodsUpdated);
      toast.success('Prato atualizado com sucesso.');
    } catch {
      toast.error('Não foi possível atualizar prato.');
    }
  };

  const deleteFood = async (foodId: number): Promise<void> => {
    const foodExists = foods.some(food => food.id === foodId);

    if(!foodExists) {
      toast.error('Não foi possível remover prato.');
      return;
    };

    const newFoodsArr = foods.filter(food => food.id !== foodId);
    setFoods(newFoodsArr);
    await api.delete(`/foods/${foodId}`);
  };

  return (
    <FoodsContext.Provider value={{ 
      foods, createFood, updateFood, deleteFood
    }}>
      {children}
    </FoodsContext.Provider>
  );
};

export function useFoods() {
  const context = useContext(FoodsContext);

  return context;
};
