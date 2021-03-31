import { ReactNode, useEffect, useState } from "react";
import ReactModal from "react-modal";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onOpenModal: () => void;
};

export function Modal({ children, isOpen, onOpenModal }: ModalProps) {
  const [modalStatus, setModalStatus] = useState(false);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      onRequestClose={onOpenModal}
      isOpen={modalStatus}
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      {children}
    </ReactModal>
  );
};