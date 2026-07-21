import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonFilled, ButtonFilledProps, ButtonOutline } from '@snack-uikit/button';

import styles from './styles.module.scss';

export type ButtonStyle = 'filled' | 'outline';

type ButtonProps = Pick<
  ButtonFilledProps,
  'label' | 'href' | 'className' | 'fullWidth' | 'size' | 'target' | 'onClick'
>;

export type HeroCentralButton = {
  text: string;
  uniqueId: string;
  link?: string;
  style?: ButtonStyle;
  onClick?: ButtonProps['onClick'];
};

type HeroCentralButtonsProps = WithLayoutType<{
  buttons?: HeroCentralButton[];
}>;

export function HeroCentralButtons({ buttons, layoutType }: HeroCentralButtonsProps) {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className={styles.buttonsContainer} data-layout-type={layoutType}>
      {buttons.map(button => {
        const buttonProps: ButtonProps = {
          label: button.text,
          href: button.link,
          className: styles.button,
          fullWidth: ['mobile', 'tablet'].includes(layoutType),
          size: 'l',
          target: '_self',
          onClick: button.onClick,
        };
        const ButtonComponent = button.style === 'outline' ? ButtonOutline : ButtonFilled;

        return <ButtonComponent key={button.uniqueId} {...buttonProps} />;
      })}
    </div>
  );
}
