import { FiltersState } from '@sbercloud/uikit-product-mobile-chips';

import { MobileToolbarProps } from './MobileToolbar';
import { ToolbarBulkActionProps } from './types';

export function extractBulkActionsProps({
  onCheck,
  checked,
  indeterminate,
  bulkActions = [],
  selectionMode,
}: ToolbarBulkActionProps) {
  return { onCheck, checked, indeterminate, actions: bulkActions, selectionMode };
}

export function isBulkActionsProps<TState extends FiltersState>(
  props: Partial<MobileToolbarProps<TState>>,
): props is ToolbarBulkActionProps {
  return 'selectionMode' in props && props.selectionMode === 'multiple';
}
