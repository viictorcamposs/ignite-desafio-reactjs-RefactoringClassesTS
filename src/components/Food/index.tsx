import { useState } from "react";
import { FiTrash, FiEdit3 } from 'react-icons/fi';
import { useFoods } from "../../hooks/useFoods";

import api from "../../services/api";
import { Food } from "../../types";

import { Body, Container, Footer, Header } from "./styles";

interface FoodProps {
  food: Food;
  handleEditFood: (food: Food) => void;
};

export function FoodComponent({ food, handleEditFood }: FoodProps) {
  const { deleteFood } = useFoods();

  const [isAvailable, setIsAvailable] = useState(true);

  const toggleAvailable = async () => {
    const updatedFood = {
      ...food,
      available: !isAvailable,
    };

    await api.put(`/foods/${food.id}`, updatedFood);
    setIsAvailable(!isAvailable);
  };

  const setEditingFood = () => {
    handleEditFood(food);
  };

  const handleDelete = (id: number) => {
    deleteFood(id);
  };

  return (
    <Container>
      <Header available={isAvailable}>
        <img src={food.image} alt={food.name} />
      </Header>
      <Body>
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </Body>
      <Footer>
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </Footer>
    </Container>
  );
}