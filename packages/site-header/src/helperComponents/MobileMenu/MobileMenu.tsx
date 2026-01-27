import { ReactNode } from 'react';

import { MobileModalCustom } from '@cloud-ru/uikit-product-mobile-modal';

import styles from './styles.module.scss';

type MobileMenuProps = {
  mobileMenuOpen: boolean;
  mobileMenuContent: ReactNode;
  mobileConsultationButton?: ReactNode;
  onClickForCloseMobileMenu: () => void;
};

export function MobileMenu({
  mobileMenuOpen,
  onClickForCloseMobileMenu,
  mobileMenuContent,
  mobileConsultationButton,
}: MobileMenuProps) {
  return (
    <MobileModalCustom open={mobileMenuOpen} onClose={onClickForCloseMobileMenu} className={styles.mobileMenu}>
      <MobileModalCustom.Header title='Меню' align='center' />
      <MobileModalCustom.Body content={mobileMenuContent} />
      {mobileConsultationButton && <MobileModalCustom.Footer actions={mobileConsultationButton} />}
    </MobileModalCustom>
  );
}
