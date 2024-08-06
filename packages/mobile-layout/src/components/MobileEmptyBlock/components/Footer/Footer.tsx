import cn from 'classnames';

import { MobileTooltipProps } from '@sbercloud/uikit-product-mobile-tooltip';
import { ButtonFilled, ButtonFilledProps, ButtonTonal, ButtonTonalProps } from '@snack-uikit/button';

import { useButtonWithTooltip } from './hooks';
import styles from './styles.module.scss';

export type FooterProps = {
  /** Основная кнопка */
  primaryButton: Omit<ButtonFilledProps, 'size'> & { tooltip?: MobileTooltipProps };
  /** Дополнительная кнопка */
  secondaryButton?: Omit<ButtonTonalProps, 'size'> & { tooltip?: MobileTooltipProps };
  className?: string;
};

export function Footer({ primaryButton, secondaryButton, className }: FooterProps) {
  const PrimaryButton = useButtonWithTooltip({ Button: ButtonFilled, tooltip: primaryButton.tooltip });
  const SecondaryButton = useButtonWithTooltip({ Button: ButtonTonal, tooltip: secondaryButton?.tooltip });

  return (
    <div className={cn(styles.infoBlockFooter, className)}>
      <PrimaryButton {...primaryButton} size='m' data-test-id={primaryButton['data-test-id']} fullWidth />
      {secondaryButton && (
        <SecondaryButton {...secondaryButton} size='m' data-test-id={secondaryButton['data-test-id']} fullWidth />
      )}
    </div>
  );
}
