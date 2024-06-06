import {
  ButtonFilled,
  ButtonFilledProps,
  ButtonSimple,
  ButtonSimpleProps,
  ButtonTonal,
  ButtonTonalProps,
} from '@snack-uikit/button';
import { InfoBlockProps } from '@snack-uikit/info-block';
import { TooltipProps } from '@snack-uikit/tooltip';

import { TEST_IDS } from '../../constants';
import { useButtonWithTooltip } from './hooks';
import styles from './styles.module.scss';

export type FooterProps = {
  size?: InfoBlockProps['size'];
  /** Основная кнопка */
  primaryButton?: Omit<ButtonFilledProps, 'size'> & { tooltip?: TooltipProps };
  /** Дополнительная кнопка */
  secondaryButton?: Omit<ButtonTonalProps, 'size'> & { tooltip?: TooltipProps };
  /** Дополнительная кнопка */
  tertiaryButton?: Omit<ButtonSimpleProps, 'size'> & { tooltip?: TooltipProps };
};

export function Footer({ primaryButton, secondaryButton, tertiaryButton, size }: FooterProps) {
  const PrimaryButton = useButtonWithTooltip({ Button: ButtonFilled, tooltip: primaryButton?.tooltip });
  const SecondaryButton = useButtonWithTooltip({ Button: ButtonTonal, tooltip: secondaryButton?.tooltip });
  const TertiaryButton = useButtonWithTooltip({ Button: ButtonSimple, tooltip: tertiaryButton?.tooltip });

  if (!secondaryButton && !primaryButton && !tertiaryButton) {
    return null;
  }

  return (
    <div className={styles.infoBlockFooter}>
      {primaryButton && (
        <PrimaryButton
          {...primaryButton}
          size={size}
          data-test-id={primaryButton['data-test-id'] || TEST_IDS.primaryButton}
        />
      )}

      {secondaryButton && (
        <SecondaryButton
          {...secondaryButton}
          size={size}
          data-test-id={secondaryButton['data-test-id'] || TEST_IDS.secondaryButton}
        />
      )}

      {tertiaryButton && (
        <TertiaryButton
          {...tertiaryButton}
          size={size}
          data-test-id={tertiaryButton['data-test-id'] || TEST_IDS.tertiaryButton}
        />
      )}
    </div>
  );
}
