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
      <TableColumn key={key}>
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonGhost
            variant={value}
            title={key}
            icon={CopyInterfaceSVG}
            iconPosition={ButtonGhost.iconPosition.Before}
            {...args}
          />
        </TableCell>

        <TableCell>
          <ButtonGhost
            variant={value}
            title={key}
            icon={CopyInterfaceSVG}
            iconPosition={ButtonGhost.iconPosition.After}
            {...args}
          />
        </TableCell>

        <TableCell>
          <ButtonGhost variant={value} title={key} {...args} />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonGhost = Template.bind({});

buttonGhost.parameters = getDefaultParameters({
  figmaUrl: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U?node-id=3064%3A45804',
  extraControlsInclude: ['text'],
});

buttonGhost.args = getDefaultArgs({ text: 'Button text' });

buttonGhost.argTypes = {
  text: {
    control: {
      required: true,
      type: 'text',
    },
  },
};
