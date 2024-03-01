import { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { copyToClipboard } from '@sbercloud/ft-copy-to-clipboard';
import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { CheckSVG, CopySVG } from '@snack-uikit/icons';

export type CopyButtonProps = {
  valueToCopy: string | number;
  size?: ButtonFunctionProps['size'];
};

export function CopyButton({ valueToCopy, size = 'xs' }: CopyButtonProps) {
  const [isChecked, setIsCheckedOpen] = useState(false);
  const timerId = useRef<NodeJS.Timeout>();
  const openChecked = () => setIsCheckedOpen(true);
  const closeChecked = () => setIsCheckedOpen(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();
    valueToCopy && copyToClipboard(String(valueToCopy));
    openChecked();
    clearTimeout(timerId.current);
    timerId.current = setTimeout(closeChecked, 1000);
  };

  useEffect(
    () => () => {
      closeChecked();
      clearTimeout(timerId.current);
    },
    [],
  );

  return (
    <ButtonFunction
      onClick={handleClick}
      data-test-id='button-copy-value'
      type='button'
      icon={isChecked ? <CheckSVG /> : <CopySVG />}
      size={size}
    />
  );
}
