import { DropdownMenu, DropdownMenuProps } from '@sbercloud/uikit-product-dropdown';
import { MoreInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { ToolbarButton, ToolbarButtonProps } from '../ToolbarButton';

export type ToolbarMoreActionsProps = Pick<DropdownMenuProps, 'actions'> & Omit<ToolbarButtonProps, 'icon'>;

export const ToolbarMoreActions = ({ actions, ...ownButtonProps }: ToolbarMoreActionsProps) => (
  <DropdownMenu actions={actions}>
    <ToolbarButton icon={<MoreInterfaceSVG />} {...ownButtonProps} />
  </DropdownMenu>
);
