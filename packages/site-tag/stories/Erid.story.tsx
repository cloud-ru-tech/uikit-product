import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Erid, EridProps } from '../src';

const meta: Meta = {
  title: 'Site/Tag/Erid',
  component: Erid,
};

export default meta;

const Template: StoryFn<EridProps> = ({ ...args }) => <Erid {...args} />;

export const erid: StoryObj<EridProps> = {
  render: Template,
  args: {
    tip: 'Hello world',
    appearance: 'neutral',
  },
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};
