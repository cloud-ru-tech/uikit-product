import { FC } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { ToolbarButton, ToolbarButtonProps } from '../ToolbarButton';
import { ToolbarFilter, ToolbarFilterProps } from '../ToolbarFilter';
import { ToolbarInput, ToolbarInputProps } from '../ToolbarInput';
import { ListToolBarStyled } from './styled';

export type ToolbarWrapperProps = {
  className?: string;
};

const ListToolBarWrapper: FC<WithSupportProps<ToolbarWrapperProps>> = ({ className, children, ...rest }) => (
  <ListToolBarStyled className={className} {...extractSupportProps(rest)}>
    {children}
  </ListToolBarStyled>
);

export const Toolbar = {
  Wrapper: ListToolBarWrapper,
  Input: ToolbarInput,
  Button: ToolbarButton,
  Filter: ToolbarFilter,
};

export type { ToolbarFilterProps, ToolbarButtonProps, ToolbarInputProps };
