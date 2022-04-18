import { extractSupportProps } from '@sbercloud/uikit-utils';

import { styledOverlay } from './styled';
import { OverlayPrivateProps, Variants } from './types';

export type { OverlayPrivateProps };

function StylelessOverlay({ variant = Variants.Fixed, onClick, className, ...rest }: OverlayPrivateProps) {
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  return <div onClick={onClick} data-variant={variant} className={className} {...extractSupportProps(rest)} />;
}

const StyledOverlay = styledOverlay(StylelessOverlay);

export const OverlayPrivate = StyledOverlay as typeof StyledOverlay & {
  variants: typeof Variants;
};

OverlayPrivate.variants = Variants;
