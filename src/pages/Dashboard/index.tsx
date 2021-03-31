import { useState } from "react";
import Modal from 'react-modal';

import { useFoods } from "../../hooks/useFoods";

import { Food } from "../../types";

import { FoodComponent } from "../../components/Food";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";

import { FoodsContainer } from "./styles";

Modal.setAppElement('#root');

export function Dashboard() {
  const { foods } = useFoods();

  const [isModalAddFoodOpen, setIsModalAddFoodOpen] = useState(false);
  const [isModalEditFoodOpen, setIsModalEditFoodOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food>({} as Food);

  const handleModalAddFood = () => {
    setIsModalAddFoodOpen(!isModalAddFoodOpen);
  };
  const handleModalEditFood = () => {
    setIsModalEditFoodOpen(!isModalEditFoodOpen);
  };

  const handleEditFood = (food: Food) => {
    setEditingFood(food);
    handleModalEditFood();
  };

  return (
    <>
      <Header onOpenAddFoodModal={handleModalAddFood} />
      <ModalAddFood 
        isOpen={isModalAddFoodOpen} 
        onOpenModal={handleModalAddFood} 
      />
      <ModalEditFood 
        isOpen={isModalEditFoodOpen} 
        onOpenModal={handleModalEditFood}
        editingFood={editingFood}
      />
      <FoodsContainer>
        {foods && foods.map(food => (
          <FoodComponent
            key={food.id}
            food={food}
            handleEditFood={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  ); 
};