import React, { useState, useCallback, useRef } from 'react';

import { CopySVG, CopyCompletedSVG } from '@sbercloud/icons';

import { Button } from 'components/Button';
import { copyText } from 'utils/copyText';

import { TButtonVariant } from 'components/Button/helpers/types';
import { ButtonVariant } from 'components/Button/helpers/constants';
import { iconStyle } from './styled';

export interface ICopyButtonProps {
  text?: string;
  overrideClick?: number;
  showCopyCompleted?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  disabled?: boolean;
  className?: string;
  variant?: TButtonVariant;
}

export const CopyButton = ({
  disabled,
  text = '',
  className,
  overrideClick,
  showCopyCompleted,
  variant = Button.variants.transparent,
  onClick: propOnClick,
}: ICopyButtonProps) => {
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
        <CopyCompletedSVG className={iconStyle} />
      ) : (
        <CopySVG className={iconStyle} />
      )}
    </Button>
  );
};

CopyButton.variants = ButtonVariant;
