import cn from 'classnames';
import { forwardRef } from 'react';

import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';

import { HTML_TYPE, SIZE, TARGET } from './constants';
import { ButtonPrivate } from './helperComponents';
import styles from './styles.module.scss';
import { CommonButtonProps } from './types';
import { extractCommonButtonProps } from './utils';

export type ButtonClaudiaProps = WithSupportProps<Omit<CommonButtonProps, 'appearance' | 'iconPosition'>>;

export const ButtonClaudia = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonClaudiaProps>(
  (
    { className, size = SIZE.S, target = TARGET.Blank, type = HTML_TYPE.Button, tabIndex, fullWidth = false, ...rest },
    ref,
  ) => (
    <ButtonPrivate
      {...extractSupportProps(rest)}
      {...extractCommonButtonProps(rest)}
      className={cn(styles.button, styles.specificityX2, className)}
      iconClassName={styles.icon}
      labelClassName={styles.label}
      size={size}
      fullWidth={fullWidth}
      target={target}
      type={type}
      tabIndex={tabIndex}
      ref={ref}
    />
  ),
);
