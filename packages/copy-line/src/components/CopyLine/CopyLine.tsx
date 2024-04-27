import cn from 'classnames';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { copyToClipboard } from '@sbercloud/ft-copy-to-clipboard';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { CheckSVG, CopySVG } from '@snack-uikit/icons';
import { TruncateString } from '@snack-uikit/truncate-string';

import styles from './styles.module.scss';

export type CopyLineProps = WithSupportProps<{
  content: string | number;
  valueToCopy?: string | number;
  className?: string;
  onClick?: MouseEventHandler;
}>;

export function CopyLine({ content, valueToCopy, className, onClick, ...rest }: CopyLineProps) {
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
      {...extractSupportProps(rest)}
    >
      <TruncateString text={String(content)} maxLines={1} />

      <ButtonFunction
        data-test-id='button-copy-value'
        type='button'
        icon={isChecked ? <CheckSVG /> : <CopySVG />}
        size='s'
        className={styles.copyButton}
      />
    </div>
  );
}
