import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Counter, CounterProps } from '../src';
import { ThemeWrapper } from './helperComponents';

export default {
  title: 'Not stable/Counter',
  component: Counter,
} as Meta;

const Template: StoryFn<CounterProps> = ({ variant, ...args }) => (
  <ThemeWrapper variant={variant}>
    <div>
      Counter <Counter {...args} variant={variant} type={Counter.types.Count} />
    </div>
    <div>
      Counter-Notify <Counter {...args} variant={variant} type={Counter.types.Notify} />
    </div>
  </ThemeWrapper>
);

export const counter = Template.bind({});
counter.args = {
  value: 5,
};
counter.argTypes = {};
counter.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=5168%3A69430',
  },
  badges: [BADGE.DEPRECATED],
  snackUiLink: 'https://frontend.cp.sbercloud.tech/snack/?path=/story/components-counter--counter',
};
