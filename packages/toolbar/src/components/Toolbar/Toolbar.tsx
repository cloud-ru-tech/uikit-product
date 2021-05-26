import { FC } from 'react';

import { ToolbarButton, ToolbarButtonProps } from '../ToolbarButton';
import { ToolbarInput, ToolbarInputProps } from '../ToolbarInput';
import { ListToolBarStyled } from './styled';

export type ToolbarWrapperProps = {
  className?: string;
};

export type IListToolBarInputProps = ToolbarInputProps;
export type IListToolBarButtonProps = ToolbarButtonProps;

const ListToolBarWrapper: FC<ToolbarWrapperProps> = ({ className, children }) => (
  <ListToolBarStyled className={className}>{children}</ListToolBarStyled>
);

export const Toolbar = {
  Wrapper: ListToolBarWrapper,
  Input: ToolbarInput,
  Button: ToolbarButton,
};
