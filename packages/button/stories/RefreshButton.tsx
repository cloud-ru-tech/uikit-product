import { Meta, StoryFn } from '@storybook/react';

import { RefreshButton, RefreshButtonProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

const meta: Meta = {
  title: 'Components/Button/Refresh Button',
  component: RefreshButton,
};
export default meta;

function Template({ ...args }: RefreshButtonProps) {
  return (
    <TableWrapper>
      <TableColumn>
        <TableCell>Button Icon Transparent / Default</TableCell>
        <TableCell>
          <RefreshButton {...args} />
        </TableCell>
      </TableColumn>
    </TableWrapper>
  );
}

export const refreshButton: StoryFn<RefreshButtonProps> = Template.bind({});

refreshButton.parameters = getDefaultParameters({
  extraControlsInclude: ['tooltip'],
});

refreshButton.args = getDefaultArgs();

refreshButton.argTypes = {
  'data-test-id': {
    control: {
      required: false,
      type: 'text',
    },
  },
};
