import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-react-button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Badge, BadgeProps } from '../src';

export default {
  title: 'Not stable/Badge',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = ({ ...args }) => (
  <Badge {...args}>
    <Button variant={Button.variants.Outline} text='Button' />
  </Badge>
);

export const badge = Template.bind({});
badge.args = {
  text: '5',
};
badge.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
badge.argTypes = {
  color: {
    control: {
      type: 'color',
    },
  },
};
