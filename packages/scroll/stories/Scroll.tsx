import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Scroll, ScrollProps } from '../src';
import { ScrollContent, Wrapper } from './helperComponents';

const meta: Meta = {
  title: 'Components/Scroll',
  component: Scroll,
};
export default meta;

function Template({ variant, flexbox, ...args }: ScrollProps) {
  return (
    <Wrapper flexbox={flexbox}>
      <Scroll variant={variant} flexbox={flexbox} {...args}>
        <ScrollContent variant={variant} />
      </Scroll>
    </Wrapper>
  );
}

export const scroll: StoryFn<ScrollProps> = Template.bind({});
scroll.args = {
  variant: Scroll.variants.Primary,
  size: Scroll.sizes.Medium,
  flexbox: false,
  barHideStrategy: Scroll.barHideStrategies.Leave,
  resize: Scroll.resize.None,
};
scroll.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=4323%3A66256',
  },
  badges: [BADGE.STABLE],
};
