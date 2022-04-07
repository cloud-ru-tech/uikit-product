import { ToolbarButton, ToolbarButtonProps } from './ToolbarButton';
import { ToolbarContainer, ToolbarContainerProps } from './ToolbarContainer';
import { ToolbarDivider } from './ToolbarDivider';
import { ToolbarFilter, ToolbarFilterProps } from './ToolbarFilter';
import { ToolbarInput, ToolbarInputProps } from './ToolbarInput';
import { ToolbarMoreActions, ToolbarMoreActionsProps } from './ToolbarMoreActions';
import { ToolbarRefresh, ToolbarRefreshProps } from './ToolbarRefresh';

export namespace Toolbar {
  export const Container = ToolbarContainer;
  export type ContainerProps = ToolbarContainerProps;
  export const Filter = ToolbarFilter;
  export type FilterProps = ToolbarFilterProps;
  export const Button = ToolbarButton;
  export type ButtonProps = ToolbarButtonProps;
  export const Divider = ToolbarDivider;
  export const MoreActions = ToolbarMoreActions;
  export type MoreActionsProps = ToolbarMoreActionsProps;
  export const Input = ToolbarInput;
  export type InputProps = ToolbarInputProps;
  export const Refresh = ToolbarRefresh;
  export type RefreshProps = ToolbarRefreshProps;
}
