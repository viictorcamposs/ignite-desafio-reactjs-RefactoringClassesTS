import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Food, FoodInput } from '../../types';
import { FormHandles } from '@unform/core';

import { useFoods } from '../../hooks/useFoods';

import { Input } from '../Input';
import { Modal } from '../Modal';

import { Form } from './styles';

interface ModalEditFoodProps {
  isOpen: boolean;
  editingFood: Food;
  onOpenModal: () => void;
};

export function ModalEditFood({ 
  isOpen, onOpenModal, editingFood 
}: ModalEditFoodProps) {
  const { updateFood } = useFoods();

  const formRef = createRef<FormHandles>();
  
  const handleSubmit = async (data: FoodInput) => {
    updateFood(editingFood.id, data);
    onOpenModal();
  };

  return (
    <Modal isOpen={isOpen} onOpenModal={onOpenModal}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};