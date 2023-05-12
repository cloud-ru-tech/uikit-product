import { Meta, StoryFn } from '@storybook/react';

import { CopyInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { Button, ButtonProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button',
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = ({ ...args }: ButtonProps) => (
  <TableWrapper>
    {Object.entries(Button.variants).map(([key, value]) => (
      <TableColumn key={key} data-variant={TableColumn.variants[value]}>
        <TableCell>{key}</TableCell>

        <TableCell>
          <Button variant={value} tooltip={{ content: key }} {...args} />
        </TableCell>

        <TableCell>
          <Button
            variant={value}
            tooltip={{ content: key, placement: Button.placements.Left }}
            disabledTooltip={{ content: 'Unavailable', placement: Button.placements.Left }}
            icon={<CopyInterfaceSVG />}
            {...args}
          />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const button = Template.bind({});

button.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=212%3A0',
  extraControlsInclude: ['text'],
});

button.args = getDefaultArgs({ text: 'Button text' });

button.argTypes = {
  text: {
    control: {
      required: true,
      type: 'text',
    },
  },
};
