import { Meta, Story } from '@storybook/react';

import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { ButtonRound, ButtonRoundProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Round',
  component: ButtonRound,
} as Meta;

const Template: Story<ButtonRoundProps> = ({ ...args }) => (
  <TableWrapper>
    {Object.entries(ButtonRound.variants).map(([key, value]) => (
      <TableColumn key={key}>
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonRound
            variant={value}
            tooltip={{ content: key, placement: ButtonRound.placements.Bottom }}
            disabledTooltip={{ content: 'Unavailable', placement: ButtonRound.placements.Bottom }}
            icon={<CirclePlayFilledInterfaceSVG />}
            {...args}
            text={undefined}
          />
        </TableCell>

        <TableCell>
          <ButtonRound
            variant={value}
            tooltip={{ content: key, placement: ButtonRound.placements.Top }}
            disabledTooltip={{ content: 'Unavailable', placement: ButtonRound.placements.Top }}
            {...args}
          />
        </TableCell>

        <TableCell>
          <ButtonRound variant={value} tooltip={{ content: key }} icon={<CirclePlayFilledInterfaceSVG />} {...args} />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonRound = Template.bind({});

buttonRound.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=11464%3A168649',
  extraControlsInclude: ['text'],
});

buttonRound.args = getDefaultArgs({ text: 'Button text' });

buttonRound.argTypes = {
  text: {
    control: {
      type: 'text',
    },
  },
};
