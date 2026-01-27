import { FiltersState } from '@cloud-ru/uikit-product-mobile-chips';

import { MobileToolbarProps } from './MobileToolbar';
import { ToolbarBulkActionProps } from './types';

export function isBulkActionsProps<TState extends FiltersState>(
  props: Partial<MobileToolbarProps<TState>>,
): props is ToolbarBulkActionProps {
  return 'selectionMode' in props && props.selectionMode === 'multiple';
}
