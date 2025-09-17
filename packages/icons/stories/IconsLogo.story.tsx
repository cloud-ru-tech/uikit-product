import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '../../../storybook/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import * as Icons from '../src/components/logo-icons';
import { getTemplate } from './helpers/StoryTemplate';

const meta: Meta = {
  title: 'Console/Icons/Logo',
};
export default meta;

const Template = getTemplate(Icons);

export const logo: StoryObj = {
  render: Template,

  args: {
    size: 50,
  },

  parameters: {
    controls: { expanded: false },
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=212%3A350',
    },
    badges: [BADGE.STABLE],
  },

  argTypes: {
    size: {
      name: '[Stories]: Size of icons',
      control: {
        type: 'range',
        min: 10,
        max: 200,
      },
    },
  },
};
