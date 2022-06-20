import { Meta, Story } from '@storybook/react';

import { CloseInterfaceSVG, DeleteInterfaceSVG, MoreInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { ButtonIcon, ButtonIconProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Icon',
  component: ButtonIcon,
} as Meta;

const Template: Story<ButtonIconProps> = ({ ...args }) => (
  <TableWrapper>
    {Object.entries(ButtonIcon.variants).map(([key, value]) => (
      <TableColumn key={key} data-variant={TableColumn.variants[value]}>
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonIcon
            {...args}
            variant={value}
            tooltip={{ content: 'Close', placement: ButtonIcon.placements.Bottom }}
            disabledTooltip={{ content: 'Unavailable', placement: ButtonIcon.placements.Bottom }}
            icon={<CloseInterfaceSVG />}
          />
        </TableCell>

        <TableCell>
          <ButtonIcon {...args} variant={value} tooltip={{ content: 'More' }} icon={<MoreInterfaceSVG />} />
        </TableCell>

        <TableCell>
          <ButtonIcon
            {...args}
            variant={value}
            tooltip={{ content: 'Delete', placement: ButtonIcon.placements.Right }}
            disabledTooltip={{ content: 'Unavailable', placement: ButtonIcon.placements.Right }}
            icon={<DeleteInterfaceSVG />}
          />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);
export const buttonIcon = Template.bind({});

buttonIcon.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=212%3A0',
});

buttonIcon.args = getDefaultArgs();
