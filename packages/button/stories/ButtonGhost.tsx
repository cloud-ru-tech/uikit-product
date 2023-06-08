import { Meta, StoryFn } from '@storybook/react';

import { CopyInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { ButtonGhost, ButtonGhostProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

const meta: Meta = {
  title: 'Components/Button/Button Ghost',
  component: ButtonGhost,
};
export default meta;

function Template({ ...args }: ButtonGhostProps) {
  return (
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
}

export const buttonGhost: StoryFn<ButtonGhostProps> = Template.bind({});

buttonGhost.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=212%3A0',
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
