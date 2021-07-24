import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';

import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-react-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonIconTransparent } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';

export default {
  title: 'Not stable/Button/Button Icon Transparent',
  component: ButtonIconTransparent,
} as Meta;

const Template: Story<Pick<ComponentProps<typeof ButtonIconTransparent>, 'rounded' | 'disabled'>> = ({ ...args }) => (
  <TableWrapper>
    {Object.entries(ButtonIconTransparent.variants).map(([key, value]) => (
      <TableColumn
        key={key}
        data-variant={value === ButtonIconTransparent.variants.Accent ? TableColumn.variants.accent : undefined}
      >
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonIconTransparent variant={value} title='Play' {...args}>
            <CirclePlayFilledInterfaceSVG />
          </ButtonIconTransparent>
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonIconTransparent = Template.bind({});

buttonIconTransparent.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=1492%3A41816',
  },
  controls: { include: ['rounded', 'disabled'] },
  badges: [BADGE.NEEDS_REVISION, BADGE.BETA],
};
buttonIconTransparent.args = {
  rounded: false,
  disabled: false,
};
