import { Meta, Story } from '@storybook/react';

import { CopyInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { ButtonSquareIcon, ButtonSquareIconProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Square Icon',
  component: ButtonSquareIcon,
} as Meta;

const Template: Story<ButtonSquareIconProps> = ({ ...args }) => (
  <TableWrapper>
    {Object.entries(ButtonSquareIcon.variants).map(([key, value]) => (
      <TableColumn
        key={key}
        data-variant={value === ButtonSquareIcon.variants.Accent ? TableColumn.variants.accent : undefined}
      >
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonSquareIcon {...args} variant={value} title='Copy' icon={CopyInterfaceSVG} />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonSquareIcon = Template.bind({});

buttonSquareIcon.parameters = getDefaultParameters({
  figmaUrl: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U?node-id=1089%3A57',
});

buttonSquareIcon.args = getDefaultArgs();
