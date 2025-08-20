import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Logo, LogoProps } from '../src';
import { DATA_TEST_ID } from './PlugElement';

const meta: Meta = {
  title: 'Console/Header/Logo',
  component: Logo,
};
export default meta;

function Template({ ...args }: LogoProps) {
  return <Logo {...args} />;
}

export const logo: StoryObj<LogoProps> = {
  render: Template,
  args: {
    href: '#',
    path: '',
    loading: false,
    'data-test-id': DATA_TEST_ID.logo,
  },
  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.BETA],
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-UI-Kit?node-id=29321-97330&m=dev',
    },
  },
};
