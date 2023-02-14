import { extractSupportProps } from '@sbercloud/uikit-product-utils';

import { styledOverlay } from './styled';
import { OverlayPrivateProps, Variants } from './types';

export type { OverlayPrivateProps };

function StylelessOverlay({ variant = Variants.Fixed, onClick, hasBlur, className, ...rest }: OverlayPrivateProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={onClick}
      data-variant={variant}
      data-has-blur={hasBlur || undefined}
      className={className}
      {...extractSupportProps(rest)}
    />
  );
}

const StyledOverlay = styledOverlay(StylelessOverlay);

export const OverlayPrivate = StyledOverlay as typeof StyledOverlay & {
  variants: typeof Variants;
};

OverlayPrivate.variants = Variants;
