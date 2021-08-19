import { Meta, Story } from '@storybook/react/types-6-0';

import { ButtonToolbar, RefreshButton, RefreshButtonProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Refresh Button',
  component: RefreshButton,
} as Meta;

const Template: Story<RefreshButtonProps> = ({ ...args }) => (
  <TableWrapper>
    <TableColumn>
      <TableCell>Button Icon Transparent / Default</TableCell>
      <TableCell>
        <RefreshButton title='Refresh' {...args} />
      </TableCell>
    </TableColumn>

    <TableColumn>
      <TableCell>Button Toolbar</TableCell>
      <TableCell>
        <RefreshButton title='Refresh' as={ButtonToolbar} {...args} />
      </TableCell>
    </TableColumn>
  </TableWrapper>
);

export const refreshButton = Template.bind({});

refreshButton.parameters = getDefaultParameters();

refreshButton.args = getDefaultArgs();
