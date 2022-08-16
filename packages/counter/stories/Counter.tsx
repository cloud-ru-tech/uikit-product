import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Counter, CounterProps } from '../src';

export default {
  title: 'Not stable/Counter',
  component: Counter,
} as Meta;

const Template: Story<CounterProps> = ({ ...args }) => (
  <>
    <div>
      Counter <Counter {...args} type={Counter.types.Count} />
    </div>
    <div>
      Counter-Notify <Counter {...args} type={Counter.types.Notify} />
    </div>
  </>
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
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=4824%3A65492',
  },
  badges: [BADGE.BETA],
};
