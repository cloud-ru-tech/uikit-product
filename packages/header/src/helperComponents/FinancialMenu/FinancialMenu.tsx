import { useUncontrolledProp } from 'uncontrollable';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { DrawerCustom } from '@snack-uikit/drawer';
import { Dropdown } from '@snack-uikit/dropdown';

import { textProvider, Texts } from '../../helpers';
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
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

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
        <DrawerCustom.Header
          title={textProvider(languageCode, Texts.FinancialMenuTitle)}
          className={styles.nestedHeader}
        />

        <div className={styles.mobileContentWrapper}>
          <PopoverContent {...content} onClose={handleClose} isMobile />
        </div>
      </DrawerCustom>
    </>
  );
}
