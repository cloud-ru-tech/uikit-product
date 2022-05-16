import { Meta, Story } from '@storybook/react';

import { CopyInterfaceSVG } from '@sbercloud/uikit-product-icons';

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
        data-variant={value === ButtonSquareIcon.variants.Accent ? TableColumn.variants.onAccent : undefined}
      >
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonSquareIcon
            {...args}
            variant={value}
            tooltip={{ content: 'Copy', placement: ButtonSquareIcon.placements.Top }}
            disabledTooltip={{ content: 'Unavailable', placement: ButtonSquareIcon.placements.Top }}
            icon={<CopyInterfaceSVG />}
          />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonSquareIcon = Template.bind({});

buttonSquareIcon.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=212%3A0',
});

buttonSquareIcon.args = getDefaultArgs();
