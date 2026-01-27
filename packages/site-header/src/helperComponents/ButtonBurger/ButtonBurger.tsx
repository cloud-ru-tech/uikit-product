import { ButtonPromoOutline } from '@cloud-ru/uikit-product-button-predefined';
import { BurgerSVG, CloseSVG } from '@cloud-ru/uikit-product-icons';

import { Appearance } from '../../components/SiteHeaderBasic';
import styles from './styles.module.scss';

type ButtonBurgerProps = {
  appearance?: Appearance;
  mobileMenuOpen: boolean;
  onClick: () => void;
};

export function ButtonBurger({ mobileMenuOpen, onClick, appearance }: ButtonBurgerProps) {
  const icon = mobileMenuOpen ? <CloseSVG /> : <BurgerSVG />;

  if (appearance === 'neutral') {
    return <ButtonPromoOutline icon={icon} size='s' appearance='secondary' />;
  }

  return (
    <button className={styles.buttonBurger} onClick={onClick}>
      {icon}
    </button>
  );
}
