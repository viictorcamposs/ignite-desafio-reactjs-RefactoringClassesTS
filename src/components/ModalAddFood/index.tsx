import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { FormHandles, SubmitHandler } from '@unform/core'
import { FoodInput } from '../../types';

import { Input } from "../Input";
import { Modal } from "../Modal";

import { Form } from "./styles";
import { useFoods } from '../../hooks/useFoods';

interface ModalAddFoodProps {
  isOpen: boolean;
  onOpenModal: () => void;
}

export function ModalAddFood({ isOpen, onOpenModal }: ModalAddFoodProps) {
  const formRef = createRef<FormHandles>();
  const { createFood } = useFoods();

  const handleSubmit: SubmitHandler<FoodInput> = (data) => {
    createFood({ ...data });
    onOpenModal();
  };

  return (
    <Modal isOpen={isOpen} onOpenModal={onOpenModal}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};