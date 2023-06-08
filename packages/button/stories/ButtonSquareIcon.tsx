import { Meta, StoryFn } from '@storybook/react';

import { CopyInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { ButtonSquareIcon, ButtonSquareIconProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

const meta: Meta = {
  title: 'Components/Button/Button Square Icon',
  component: ButtonSquareIcon,
};
export default meta;

function Template({ ...args }) {
  return (
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
}

export const buttonSquareIcon: StoryFn<ButtonSquareIconProps> = Template.bind({});

buttonSquareIcon.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=11464%3A168649',
});

buttonSquareIcon.args = getDefaultArgs();
