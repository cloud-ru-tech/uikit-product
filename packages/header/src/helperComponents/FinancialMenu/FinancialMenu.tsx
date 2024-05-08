import { useUncontrolledProp } from 'uncontrollable';

import { Dropdown } from '@snack-uikit/dropdown';

import { ButtonFinancial, ButtonFinancialProps, PopoverContent, PopoverContentProps } from './components';

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
      content={<PopoverContent {...content} onClose={handlePopoverClose} />}
      trigger='click'
      placement='bottom-end'
    >
      <ButtonFinancial {...button} valueVisible={content.eyeButton?.dataVisible} />
    </Dropdown>
  );
}
