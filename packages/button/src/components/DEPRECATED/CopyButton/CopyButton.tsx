import { CopiedInterfaceSVG, CopyInterfaceSVG } from '@sbercloud/uikit-react-icons';
import copyText from 'copy-to-clipboard';
import { useCallback, useRef, useState } from 'react';

import { ButtonVariant } from '../../../helpers/constants';
import { Button } from '../Default';
import { iconStyle } from './styled';

export type CopyButtonProps = {
  text?: string;
  overrideClick?: number;
  showCopyCompleted?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
};

export const CopyButton = ({
  disabled,
  text = '',
  className,
  overrideClick,
  showCopyCompleted,
  variant = Button.variants.Transparent,
  onClick: propOnClick,
}: CopyButtonProps) => {
  const [isCopyCompleted, setIsCopyCompleted] = useState(false);
  const oldOverrideClick = useRef<number>();

  const copy = useCallback(() => {
    copyText(text);
    setIsCopyCompleted(true);

    setTimeout(() => {
      setIsCopyCompleted(false);
    }, 3000);
  }, [text]);

  const handleClickCopy = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      copy();
      if (propOnClick) {
        propOnClick(event);
      }
    },
    [copy, propOnClick],
  );

  if (overrideClick !== 0 && overrideClick !== oldOverrideClick.current) {
    copy();
    oldOverrideClick.current = overrideClick;
  }

  return (
    <Button
      className={className}
      variant={variant}
      size={Button.sizes.xs}
      disabled={disabled}
      onClick={handleClickCopy}
    >
      {showCopyCompleted || isCopyCompleted ? (
        <CopiedInterfaceSVG className={iconStyle} />
      ) : (
        <CopyInterfaceSVG className={iconStyle} />
      )}
    </Button>
  );
};

CopyButton.variants = ButtonVariant;
