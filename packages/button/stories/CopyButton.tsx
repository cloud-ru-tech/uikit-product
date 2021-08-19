import { Meta, Story } from '@storybook/react/types-6-0';

import { ButtonIcon, CopyButton, CopyButtonProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Copy Button',
  component: CopyButton,
} as Meta;

const Template: Story<CopyButtonProps> = ({ ...args }) => (
  <TableWrapper>
    <TableColumn>
      <TableCell>Button Icon Transparent / Default</TableCell>
      <TableCell>
        <CopyButton {...args} />
      </TableCell>
    </TableColumn>

    <TableColumn>
      <TableCell>Button Icon / Color</TableCell>
      <TableCell>
        <CopyButton as={ButtonIcon} variant={ButtonIcon.variants.Color} {...args} />
      </TableCell>
    </TableColumn>
  </TableWrapper>
);

export const copyButton = Template.bind({});

copyButton.parameters = getDefaultParameters({
  extraControlsInclude: ['text'],
});

copyButton.args = getDefaultArgs({ text: 'Text for copy' });

copyButton.argTypes = {
  text: {
    control: {
      required: true,
      type: 'text',
    },
  },
};
