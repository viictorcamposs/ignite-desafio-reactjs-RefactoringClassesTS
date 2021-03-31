import { Container, HeaderContainer } from "./styles";
import { FiPlusSquare } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  onOpenAddFoodModal: () => void;
};

export function Header({ onOpenAddFoodModal }: HeaderProps) {
  return (
    <Container>
      <HeaderContainer>
        <img src={Logo} alt="GoRestaurant"/>
        <nav>
            <div>
              <button
                type="button"
                onClick={onOpenAddFoodModal}
              >
                <div className="text">Novo Prato</div>
                <div className="icon">
                  <FiPlusSquare size={24} />
                </div>
              </button>
            </div>
          </nav>
      </HeaderContainer>
    </Container>
  );
};