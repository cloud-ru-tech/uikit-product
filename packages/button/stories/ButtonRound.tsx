import { Meta, Story } from '@storybook/react';

import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-react-icons';

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
            tooltip={key}
            icon={<CirclePlayFilledInterfaceSVG />}
            disabledTooltip='Unavailable'
            tooltipPlacement={ButtonRound.placements.Bottom}
            {...args}
            text={undefined}
          />
        </TableCell>

        <TableCell>
          <ButtonRound
            variant={value}
            tooltip={key}
            disabledTooltip='Unavailable'
            tooltipPlacement={ButtonRound.placements.Top}
            {...args}
          />
        </TableCell>

        <TableCell>
          <ButtonRound variant={value} tooltip={key} icon={<CirclePlayFilledInterfaceSVG />} {...args} />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonRound = Template.bind({});

buttonRound.parameters = getDefaultParameters({
  figmaUrl: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U?node-id=1086%3A22431',
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
