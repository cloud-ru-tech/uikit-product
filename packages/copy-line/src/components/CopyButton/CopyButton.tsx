import { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { copyToClipboard } from '@sbercloud/ft-copy-to-clipboard';
import { CheckSVG, CopySVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';

export type CopyButtonProps = WithSupportProps<{
  valueToCopy: string | number;
  size?: ButtonFunctionProps['size'];
  className?: string;
}>;

export function CopyButton({ valueToCopy, size = 'xs', className, ...rest }: CopyButtonProps) {
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
      {...extractSupportProps(rest)}
      onClick={handleClick}
      className={className}
      data-test-id='button-copy-value'
      type='button'
      icon={isChecked ? <CheckSVG /> : <CopySVG />}
      size={size}
    />
  );
}
