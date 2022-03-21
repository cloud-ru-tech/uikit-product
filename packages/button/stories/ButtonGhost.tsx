import { Meta, Story } from '@storybook/react';

import { CopyInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { ButtonGhost, ButtonGhostProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Ghost',
  component: ButtonGhost,
} as Meta;

const Template: Story<ButtonGhostProps> = ({ ...args }) => (
  <TableWrapper>
    {Object.entries(ButtonGhost.variants).map(([key, value]) => (
      <TableColumn key={key} data-variant={TableColumn.variants[value]}>
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonGhost
            variant={value}
            tooltip={{ content: key, placement: ButtonGhost.placements.Left }}
            disabledTooltip={{ content: 'Unavailable', placement: ButtonGhost.placements.Left }}
            icon={<CopyInterfaceSVG />}
            iconPosition={ButtonGhost.iconPosition.Before}
            {...args}
          />
        </TableCell>

        <TableCell>
          <ButtonGhost
            variant={value}
            tooltip={{ content: key }}
            icon={<CopyInterfaceSVG />}
            iconPosition={ButtonGhost.iconPosition.After}
            {...args}
          />
        </TableCell>

        <TableCell>
          <ButtonGhost variant={value} tooltip={{ content: key }} {...args} />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonGhost = Template.bind({});

buttonGhost.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=212%3A0',
  extraControlsInclude: ['text', 'size'],
});

buttonGhost.args = getDefaultArgs({ text: 'Button text', size: ButtonGhost.sizes.Medium });

buttonGhost.argTypes = {
  text: {
    control: {
      required: true,
      type: 'text',
    },
  },
  size: {
    control: {
      type: 'radio',
    },
    options: Object.values(ButtonGhost.sizes),
  },
};
