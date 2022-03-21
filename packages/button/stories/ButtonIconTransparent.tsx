import { Meta, Story } from '@storybook/react';

import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { ButtonIconTransparent, ButtonIconTransparentProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Icon Transparent',
  component: ButtonIconTransparent,
} as Meta;

const Template: Story<ButtonIconTransparentProps> = ({ ...args }) => (
  <TableWrapper>
    {Object.entries(ButtonIconTransparent.variants).map(([key, value]) => (
      <TableColumn
        key={key}
        data-variant={value === ButtonIconTransparent.variants.Accent ? TableColumn.variants.onAccent : undefined}
      >
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonIconTransparent
            {...args}
            variant={value}
            tooltip={{ content: 'Play', placement: ButtonIconTransparent.placements.Top }}
            disabledTooltip={{ content: 'Unavailable', placement: ButtonIconTransparent.placements.Top }}
            icon={<CirclePlayFilledInterfaceSVG />}
          />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonIconTransparent = Template.bind({});

buttonIconTransparent.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=212%3A0',
  extraControlsInclude: ['rounded'],
});

buttonIconTransparent.args = getDefaultArgs({ rounded: false });
