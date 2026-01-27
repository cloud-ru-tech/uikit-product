import { ArrowLinksSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';
import { Link } from '@snack-uikit/link';

import { SectionButtonProps } from './types';

export function SectionButton(button: SectionButtonProps) {
  const { type, ...buttonProps } = button;

  if (button.href) {
    return <Link key={button.label} {...buttonProps} text={button.label} size='l' insideText />;
  }

  if (type === 'outline') {
    return <ButtonOutline key={button.label} size='l' appearance='neutral' icon={<ArrowLinksSVG />} {...buttonProps} />;
  }

  return <ButtonFilled key={button.label} size='l' {...buttonProps} />;
}
