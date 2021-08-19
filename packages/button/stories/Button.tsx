import { Meta, Story } from '@storybook/react';

import { CopyInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { Button, ButtonProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = ({ ...args }) => (
  <TableWrapper>
    {Object.entries(Button.variants).map(([key, value]) => (
      <TableColumn
        key={key}
        data-variant={value === Button.variants.OnAccent ? TableColumn.variants.accent : undefined}
      >
        <TableCell>{key}</TableCell>

        <TableCell>
          <Button variant={value} tooltip={key} {...args} />
        </TableCell>

        <TableCell>
          <Button
            variant={value}
            tooltip={key}
            disabledTooltip='Unavailable'
            tooltipPlacement={Button.placements.Left}
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
  figmaUrl: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U?node-id=1058%3A18914',
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
