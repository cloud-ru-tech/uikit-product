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
        data-variant={value === ButtonIconTransparent.variants.Accent ? TableColumn.variants.accent : undefined}
      >
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonIconTransparent {...args} variant={value} title='Play' icon={CirclePlayFilledInterfaceSVG} />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonIconTransparent = Template.bind({});

buttonIconTransparent.parameters = getDefaultParameters({
  figmaUrl: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U?node-id=1492%3A41816',
  extraControlsInclude: ['rounded'],
});

buttonIconTransparent.args = getDefaultArgs({ rounded: false });
