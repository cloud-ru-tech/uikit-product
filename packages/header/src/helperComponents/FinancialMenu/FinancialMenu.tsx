import { useUncontrolledProp } from 'uncontrollable';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { DrawerCustom } from '@snack-uikit/drawer';
import { Dropdown } from '@snack-uikit/dropdown';

import { ButtonFinancial, ButtonFinancialProps, PopoverContent } from './components';
import styles from './styles.module.scss';
import { PopoverContentProps } from './types';

export type FinancialMenuProps = {
  open?: boolean;
  onOpenChange?(value: boolean): void;
  button: Omit<ButtonFinancialProps, 'valueVisible'>;
  content: Omit<PopoverContentProps, 'onClose'>;
};

export function FinancialMenu({ button, content, open, onOpenChange }: FinancialMenuProps) {
  const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  return (
    <Dropdown
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <div className={styles.contentWrapper}>
          <PopoverContent {...content} onClose={handlePopoverClose} />
        </div>
      }
      trigger='click'
      placement='bottom-end'
    >
      <ButtonFinancial {...button} valueVisible={content.eyeButton?.dataVisible} isLoading={content.loading} />
    </Dropdown>
  );
}

export function MobileFinancialMenu({ button, content, open, onOpenChange }: FinancialMenuProps) {
  const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);
  const { t } = useLocale('Header');

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ButtonFinancial
        {...button}
        valueVisible={content.eyeButton?.dataVisible}
        isLoading={content.loading}
        onClick={() => {
          setIsOpen(true);
        }}
      />

      <DrawerCustom open={isOpen} onClose={handleClose} position='left'>
        <DrawerCustom.Header title={t('financialMenuTitle')} className={styles.nestedHeader} />

        <div className={styles.mobileContentWrapper}>
          <PopoverContent {...content} onClose={handleClose} isMobile />
        </div>
      </DrawerCustom>
    </>
  );
}
