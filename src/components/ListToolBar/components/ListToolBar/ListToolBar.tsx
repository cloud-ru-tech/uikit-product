import { FC } from 'react';

import {
  ToolBarInput,
  IToolBarInputProps,
} from 'components/ListToolBar/helperComponents/ToolBarInput/ToolBarInput';
import {
  ToolBarButton,
  IToolBarButtonProps,
} from 'components/ListToolBar/helperComponents/ToolBarButton/ToolBarButton';

import { ListToolBarStyled } from './styled';

export interface IListToolBarWrapperProps {
  className?: string;
}

export type IListToolBarInputProps = IToolBarInputProps;
export type IListToolBarButtonProps = IToolBarButtonProps;

const ListToolBarWrapper: FC<IListToolBarWrapperProps> = ({
  className,
  children,
}) => <ListToolBarStyled className={className}>{children}</ListToolBarStyled>;

export const ListToolBar = {
  Wrapper: ListToolBarWrapper,
  Input: ToolBarInput,
  Button: ToolBarButton,
};
