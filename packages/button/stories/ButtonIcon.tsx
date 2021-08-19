import { Meta, Story } from '@storybook/react';

import { CloseInterfaceSVG, DeleteInterfaceSVG, MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';

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
      <TableColumn
        key={key}
        data-variant={value === ButtonIcon.variants.OnAccent ? TableColumn.variants.accent : undefined}
      >
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonIcon
            {...args}
            variant={value}
            tooltip='Close'
            disabledTooltip='Unavailable'
            tooltipPlacement={ButtonIcon.placements.Bottom}
            icon={<CloseInterfaceSVG />}
          />
        </TableCell>

        <TableCell>
          <ButtonIcon {...args} variant={value} tooltip='More' icon={<MoreInterfaceSVG />} />
        </TableCell>

        <TableCell>
          <ButtonIcon
            {...args}
            variant={value}
            tooltip='Delete'
            disabledTooltip='Unavailable'
            tooltipPlacement={ButtonIcon.placements.Right}
            icon={<DeleteInterfaceSVG />}
          />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);
export const buttonIcon = Template.bind({});

buttonIcon.parameters = getDefaultParameters({
  figmaUrl: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U?node-id=1492%3A42272',
});

buttonIcon.args = getDefaultArgs();
