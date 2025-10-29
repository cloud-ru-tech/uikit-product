import { ButtonFilledProps } from '@snack-uikit/button';

export type SectionButtonProps = {
  label: string;
  href?: string;
  target?: ButtonFilledProps['target'];
  onClick?: ButtonFilledProps['onClick'];
  type?: 'brand' | 'outline';
};
