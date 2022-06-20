import { Meta, Story } from '@storybook/react';

import { ButtonTableIcon, ButtonTableIconManagedLoading, ButtonTableIconProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters, onClick } from './helpers';

export default {
  title: 'Components/Button/Button Table Icon',
  component: ButtonTableIcon,
} as Meta;

const Template: Story<ButtonTableIconProps> = ({ ...args }) => (
  <TableWrapper>
    <TableColumn>
      <TableCell />
      <TableCell>default</TableCell>
      <TableCell>managed loading</TableCell>
    </TableColumn>

    {Object.entries(ButtonTableIcon.variants).map(([key, value]) => (
      <TableColumn key={key} data-variant={value}>
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonTableIcon
            variant={value}
            disabledTooltip={{ content: 'Unavailable', placement: ButtonTableIcon.placements.Left }}
            {...args}
          />
        </TableCell>

        <TableCell>
          <ButtonTableIconManagedLoading
            variant={value}
            onClick={onClick}
            disabledTooltip={{ content: 'Unavailable', placement: ButtonTableIcon.placements.Right }}
            {...args}
            data-test-id={`${args['data-test-id'] || ''}-managed-loading`}
          />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonTableIcon = Template.bind({});

buttonTableIcon.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=11464%3A168649',
  extraControlsInclude: ['loading'],
});

buttonTableIcon.args = getDefaultArgs({ loading: false });
