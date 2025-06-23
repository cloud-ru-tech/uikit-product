import { BurgerSVG, CloseSVG } from '@sbercloud/uikit-product-icons';

import styles from './styles.module.scss';

type ButtonBurgerProps = {
  mobileMenuOpen: boolean;
  onClick: () => void;
};

export function ButtonBurger({ mobileMenuOpen, onClick }: ButtonBurgerProps) {
  return (
    <button className={styles.buttonBurger} onClick={onClick}>
      {mobileMenuOpen ? <CloseSVG /> : <BurgerSVG />}
    </button>
  );
}
