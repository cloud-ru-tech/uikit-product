import cn from 'classnames';
import { MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';

import { copyToClipboard } from '@cloud-ru/ft-copy-to-clipboard';
import { CheckSVG, CopySVG } from '@cloud-ru/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { TruncateString } from '@snack-uikit/truncate-string';

import { COPY_BUTTON_HIDE_STRATEGY } from './constants';
import styles from './styles.module.scss';
import { CopyButtonHideStrategy } from './types';
import { isStringOrNumber } from './utils';

export type CopyLineProps = WithSupportProps<{
  content: ReactNode;
  valueToCopy?: string | number;
  className?: string;
  onClick?: MouseEventHandler;
  copyButtonHideStrategy?: CopyButtonHideStrategy;
}>;

export function CopyLine({
  content,
  className,
  valueToCopy: valueToCopyProp,
  onClick,
  copyButtonHideStrategy = COPY_BUTTON_HIDE_STRATEGY.Hover,
  ...rest
}: CopyLineProps) {
  const valueToCopy = valueToCopyProp ?? (isStringOrNumber(content) ? String(content) : '');
  const [isChecked, setIsCheckedOpen] = useState(false);
  const timerId = useRef<NodeJS.Timeout>();
  const openChecked = () => setIsCheckedOpen(true);
  const closeChecked = () => setIsCheckedOpen(false);

  const handleClick: MouseEventHandler<HTMLElement> = event => {
    event.stopPropagation();
    valueToCopy && copyToClipboard(String(valueToCopy));
    openChecked();
    clearTimeout(timerId.current);
    timerId.current = setTimeout(closeChecked, 1000);

    onClick?.(event);
  };

  useEffect(
    () => () => {
      closeChecked();
      clearTimeout(timerId.current);
    },
    [],
  );

  return (
    <div
      className={cn(styles.copyLine, className)}
      onClick={handleClick}
      role='presentation'
      data-copy-button-hide-strategy={copyButtonHideStrategy}
      {...extractSupportProps(rest)}
    >
      {isStringOrNumber(content) ? <TruncateString text={String(content)} maxLines={1} /> : content}

      <ButtonFunction
        data-test-id='button-copy-value'
        type='button'
        icon={isChecked ? <CheckSVG /> : <CopySVG />}
        size='xs'
        className={cn(styles.copyButton, className)}
      />
    </div>
  );
}
