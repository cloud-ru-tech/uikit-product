import { DropdownMenu, DropdownMenuProps } from '@sbercloud/uikit-react-dropdown';
import { MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { ToolbarButton, ToolbarButtonProps } from '../ToolbarButton';

export type ToolbarMoreActionsProps = Pick<DropdownMenuProps, 'actions'> & ToolbarButtonProps;

export const ToolbarMoreActions = ({ actions, ...ownButtonProps }: ToolbarMoreActionsProps) => (
  <DropdownMenu actions={actions}>
    <ToolbarButton {...ownButtonProps}>
      <MoreInterfaceSVG />
    </ToolbarButton>
  </DropdownMenu>
);
