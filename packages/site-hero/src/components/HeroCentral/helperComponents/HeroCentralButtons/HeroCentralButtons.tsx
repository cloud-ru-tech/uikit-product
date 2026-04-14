import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';

import styles from './styles.module.scss';

export type ButtonStyle = 'filled' | 'outline';

export type HeroCentralButton = {
  text: string;
  uniqueId: string;
  link?: string;
  style?: ButtonStyle;
  onClick?: () => void;
};

type HeroCentralButtonsProps = WithLayoutType<{
  buttons?: HeroCentralButton[];
}>;

export function HeroCentralButtons({ buttons, layoutType }: HeroCentralButtonsProps) {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className={styles.buttonsContainer} data-layout-type={layoutType}>
      {buttons.map(button => {
        const buttonProps = {
          key: button.uniqueId,
          label: button.text,
          href: button.link,
          className: styles.button,
          fullWidth: ['mobile', 'tablet'].includes(layoutType),
          size: 'l' as const,
          target: '_self' as const,
          onClick: button.onClick,
        };

        return button.style === 'outline' ? <ButtonOutline {...buttonProps} /> : <ButtonFilled {...buttonProps} />;
      })}
    </div>
  );
}
