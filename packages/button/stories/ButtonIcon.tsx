import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';

import { CloseInterfaceSVG, DeleteInterfaceSVG, MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonIcon } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';

export default {
  title: 'Not stable/Button/Button Icon',
  component: ButtonIcon,
} as Meta;

const Template: Story<Pick<ComponentProps<typeof ButtonIcon>, 'disabled'>> = ({ ...args }) => (
  <TableWrapper>
    {Object.entries(ButtonIcon.variants).map(([key, value]) => (
      <TableColumn
        key={key}
        data-variant={value === ButtonIcon.variants.OnAccent ? TableColumn.variants.accent : undefined}
      >
        <TableCell>{key}</TableCell>

        <TableCell>
          <ButtonIcon variant={value} title='Close' {...args}>
            <CloseInterfaceSVG />
          </ButtonIcon>
        </TableCell>

        <TableCell>
          <ButtonIcon variant={value} title='More' {...args}>
            <MoreInterfaceSVG />
          </ButtonIcon>
        </TableCell>

        <TableCell>
          <ButtonIcon variant={value} title='Delete' {...args}>
            <DeleteInterfaceSVG />
          </ButtonIcon>
        </TableCell>
      </TableColumn>
    ))}
  </TableWrapper>
);
export const buttonIcon = Template.bind({});

buttonIcon.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=1492%3A42272',
  },
  controls: { include: ['disabled'] },
  badges: [BADGE.NEEDS_REVISION, BADGE.BETA],
};
buttonIcon.args = {
  disabled: false,
};
