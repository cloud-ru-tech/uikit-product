import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { TrashSVG, FilterSVG, RefreshSVG } from '@sbercloud/icons';

import { Badge } from 'components/Badge';

import { TableMenuButton, ITableMenuButtonProps } from './TableMenuButton';

export default {
  title: 'Components/Button/Table Menu Button',
  component: TableMenuButton,
} as Meta;

const RowStyled = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonWrapStyled = styled.div`
  background: #fff;
`;

const Template: Story<ITableMenuButtonProps> = ({ ...args }) => (
  <RowStyled>
    <TableMenuButton {...args}>
      <TrashSVG />
    </TableMenuButton>
    <TableMenuButton {...args}>
      <Badge text='5'>
        <FilterSVG />
      </Badge>
    </TableMenuButton>
    <ButtonWrapStyled>
      <TableMenuButton {...args}>
        <RefreshSVG />
      </TableMenuButton>
    </ButtonWrapStyled>
  </RowStyled>
);

export const tableMenuButton = Template.bind({});
tableMenuButton.args = {};
