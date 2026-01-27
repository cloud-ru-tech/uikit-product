import cn from 'classnames';
import { forwardRef } from 'react';

import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';

import { HTML_TYPE, TARGET } from '../constants';
import { ButtonPrivate } from '../helperComponents';
import { CommonButtonProps } from '../helperComponents/ButtonPrivate/types';
import styles from './styles.module.scss';
import { extractCommonButtonProps } from './utils';

export type ButtonGigaMamaProps = WithSupportProps<Omit<CommonButtonProps, 'appearance' | 'size' | 'iconPosition'>>;

export const ButtonGigaMama = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonGigaMamaProps>(
  ({ className, target = TARGET.Blank, type = HTML_TYPE.Button, tabIndex, fullWidth = false, ...rest }, ref) => (
    <ButtonPrivate
      {...extractSupportProps(rest)}
      {...extractCommonButtonProps({ ...rest })}
      className={cn(styles.button, styles.specificity, className)}
      iconClassName={styles.icon}
      labelClassName={styles.label}
      fullWidth={fullWidth}
      target={target}
      type={type}
      tabIndex={tabIndex}
      ref={ref}
    />
  ),
);
