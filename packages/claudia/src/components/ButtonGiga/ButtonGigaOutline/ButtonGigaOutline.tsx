import cn from 'classnames';
import { forwardRef } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { HTML_TYPE, ICON_POSITION, SIZE, TARGET } from '../constants';
import { ButtonPrivate } from '../helperComponents';
import styles from './styles.module.scss';
import { CommonButtonProps } from './types';
import { extractCommonButtonProps } from './utils';

export type ButtonGigaOutlineProps = WithSupportProps<Omit<CommonButtonProps, 'appearance'>>;

export const ButtonGigaOutline = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonGigaOutlineProps>(
  (
    {
      className,
      size = SIZE.S,
      target = TARGET.Blank,
      type = HTML_TYPE.Button,
      iconPosition = ICON_POSITION.Before,
      tabIndex,
      fullWidth = false,
      ...rest
    },
    ref,
  ) => (
    <ButtonPrivate
      {...extractSupportProps(rest)}
      {...extractCommonButtonProps({ ...rest, iconPosition })}
      className={cn(styles.button, styles.specificityX2, className)}
      iconClassName={styles.icon}
      labelClassName={styles.label}
      iconPosition={iconPosition}
      size={size}
      fullWidth={fullWidth}
      target={target}
      type={type}
      tabIndex={tabIndex}
      ref={ref}
    />
  ),
);
