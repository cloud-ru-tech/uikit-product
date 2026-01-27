import { FiltersState } from '@cloud-ru/uikit-product-mobile-chips';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Toolbar, ToolbarProps } from '@snack-uikit/toolbar';

import { MobileToolbar } from '../MobileToolbar';

export type AdaptiveToolbarProps<TState extends FiltersState = Record<string, unknown>> = WithLayoutType<
  ToolbarProps<TState>
>;

export function AdaptiveToolbar<TState extends FiltersState = Record<string, unknown>>({
  layoutType,
  ...props
}: AdaptiveToolbarProps<TState>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileToolbar<TState> {...props} /> : <Toolbar<TState> {...props} />;
}

export type { ToolbarProps };
