import { ArrowLinksSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonFilled, ButtonFilledProps, ButtonOutline } from '@snack-uikit/button';

type SectionButtonProps = {
  label: string;
  href?: string;
  target?: ButtonFilledProps['target'];
  onClick?: ButtonFilledProps['onClick'];
  type?: 'brand' | 'outline';
};

export function BenefitsButton(button: SectionButtonProps) {
  const { type, ...buttonProps } = button;

  if (type === 'outline') {
    return (
      <ButtonOutline
        key={button.label}
        size='l'
        href={button.href}
        appearance='neutral'
        icon={<ArrowLinksSVG />}
        {...buttonProps}
      />
    );
  }

  return <ButtonFilled key={button.label} size='l' href={button.href} {...buttonProps} />;
}
