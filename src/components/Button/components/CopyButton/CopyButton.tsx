import { FC, useState, useCallback, useRef } from 'react';

import { CopySVG, CopyCompletedSVG } from '@aicloud/ui-icons';

import { Button } from 'components/Button';
import { copyText } from 'utils/copyText';

import { iconStyle } from './styled';

export interface ICopyButtonProps {
  text?: string;
  overrideClick?: number;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  disabled?: boolean;
  className?: string;
}

export const CopyButton: FC<ICopyButtonProps> = ({
  disabled,
  text = '',
  overrideClick,
  onClick: propOnClick,
  className,
}) => {
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
      variant='transparent'
      size='xs'
      disabled={disabled}
      onClick={handleClickCopy}
    >
      {isCopyCompleted ? (
        <CopyCompletedSVG className={iconStyle} />
      ) : (
        <CopySVG className={iconStyle} />
      )}
    </Button>
  );
};
