import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { IconGiga, IconGigaProps } from '../src';

const meta: Meta = {
  title: 'Console/Claudia/Icon Giga Gradient',
  component: IconGiga,
};
export default meta;

type StoryProps = IconGigaProps;

const Template: StoryFn<StoryProps> = ({ ...args }) => <IconGiga {...args} />;

export const iconGigaGradient: StoryObj<StoryProps> = {
  render: Template,
  args: {
    size: 24,
    withBranding: true,
  },
  argTypes: {
    size: {
      control: {
        type: 'number',
        min: 8,
        max: 200,
        step: 1,
      },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};
