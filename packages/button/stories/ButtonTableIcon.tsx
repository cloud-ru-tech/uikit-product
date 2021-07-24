import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonTableIcon, ButtonTableIconManagedConnecting } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { onClick } from './helpers';

export default {
  title: 'Not stable/Button/Button Table Icon',
  component: ButtonTableIcon,
} as Meta;

const Template: Story<Pick<ComponentProps<typeof ButtonTableIcon>, 'connecting' | 'disabled'>> = ({ ...args }) => (
  <TableWrapper>
    <TableColumn>
      <TableCell></TableCell>
      <TableCell>default</TableCell>
      <TableCell>managed connecting</TableCell>
    </TableColumn>

    {Object.entries(ButtonTableIcon.variants).map(([key, value]) => (
      <TableColumn key={key} data-variant={value}>
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonTableIcon variant={value} title={key} {...args} />
        </TableCell>

        <TableCell>
          <ButtonTableIconManagedConnecting variant={value} title={key} onClick={onClick} {...args} />
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonTableIcon = Template.bind({});

buttonTableIcon.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=1103%3A24006',
  },
  controls: { include: ['connecting', 'disabled'] },
  badges: [BADGE.NEEDS_REVISION, BADGE.BETA],
};
buttonTableIcon.args = {
  connecting: false,
  disabled: false,
};
