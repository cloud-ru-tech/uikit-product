import { Meta, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import * as Icons from '../src/components/interface-icons-system';
import { getTemplate } from './helpers/StoryTemplate';

type StoryProps = {
  size?: number | string;
};

const meta: Meta = {
  title: 'Console/Icons/Interface/System',
};
export default meta;

const Template = getTemplate(Icons);

export const system: StoryObj<StoryProps> = {
  render: Template,

  args: {
    size: 24,
  },

  argTypes: {
    size: {
      control: {
        type: 'range',
        min: 10,
        max: 200,
      },
    },
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
      url: 'https://www.figma.com/file/1VED778PiyCttjo5uveBUj/branch/iwQwxxJh9XaIDB0xC5uUsE/Product-Icon?type=design&node-id=3%3A102&mode=design&t=qMZT1gr4EMuRsTxi-1',
    },
  },
};
