import { MouseEvent } from 'react';

import { LAYOUT_TYPE, LayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { APPEARANCE } from '../../constants';
import { Appearance } from '../../types';
import styles from './styles.module.scss';

type AlertButtonProps = {
  text?: string;
  onClick?(e: MouseEvent<HTMLButtonElement>): void;
  layoutType: LayoutType;
  appearance: Appearance;
};

export function AlertButton({ text, onClick, layoutType, appearance = APPEARANCE.blue }: AlertButtonProps) {
  const TypographyText = layoutType === LAYOUT_TYPE.Mobile ? Typography.SansLabelL : Typography.SansLabelM;

  return (
    <button type='button' onClick={onClick} className={styles.alertButton}>
      {text && (
        <TypographyText data-appearance={appearance} className={styles.text}>
          {text}
        </TypographyText>
      )}
    </button>
  );
}
