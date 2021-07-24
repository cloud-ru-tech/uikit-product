import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonTable, ButtonTableManagedConnecting } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { onClick } from './helpers';

export default {
  title: 'Not stable/Button/Button Table',
  component: ButtonTable,
} as Meta;

const Template: Story<Pick<ComponentProps<typeof ButtonTable>, 'connecting' | 'disabled'>> = ({ ...args }) => (
  <TableWrapper>
    <TableColumn>
      <TableCell></TableCell>
      <TableCell>default</TableCell>
      <TableCell>managed connecting</TableCell>
    </TableColumn>

    {Object.entries(ButtonTable.variants).map(([key, value]) => (
      <TableColumn
        key={key}
        data-variant={value === ButtonTable.variants.OnAccent ? TableColumn.variants.accent : undefined}
      >
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonTable variant={value} title='Connect' {...args}>
            Подключиться
          </ButtonTable>
        </TableCell>

        <TableCell>
          <ButtonTableManagedConnecting variant={value} title='Connect' onClick={onClick} {...args}>
            Подключиться
          </ButtonTableManagedConnecting>
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);

export const buttonTable = Template.bind({});

buttonTable.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=1100%3A22793',
  },
  controls: { include: ['connecting', 'disabled'] },
  badges: [BADGE.NEEDS_REVISION, BADGE.BETA],
};
buttonTable.args = {
  connecting: false,
  disabled: false,
};
