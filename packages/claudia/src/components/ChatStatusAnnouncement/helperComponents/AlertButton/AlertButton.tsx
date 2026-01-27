import { MouseEvent } from 'react';

import { LAYOUT_TYPE, LayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type PrivateAlertButtonProps = {
  text?: string;
  onClick?(e: MouseEvent<HTMLButtonElement>): void;
  layoutType: LayoutType;
};

export type AlertButtonProps = Omit<PrivateAlertButtonProps, 'appearance' | 'variant'>;

export function AlertButton({ text, onClick, layoutType }: PrivateAlertButtonProps) {
  const TypographyText = layoutType === LAYOUT_TYPE.Mobile ? Typography.SansLabelL : Typography.SansLabelM;

  return (
    <button type='button' onClick={onClick} className={styles.alertButton}>
      {text && <TypographyText className={styles.text}>{text}</TypographyText>}
    </button>
  );
}
