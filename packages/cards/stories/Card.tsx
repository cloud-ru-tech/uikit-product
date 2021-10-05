import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Story } from '@storybook/react/types-6-0';

import { H4, Text2 } from '@sbercloud/uikit-typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Card, CardProps } from '../src';

export default {
  title: 'Not stable/Card/Card',
  component: Card,
} as Meta;

const handleClick = (e: React.MouseEvent<HTMLElement>) => {
  e.stopPropagation();
  alert('Card alert');
};

const Template: Story<CardProps> = ({ ...args }) => (
  <Card {...args} onClick={handleClick}>
    <H4>Вступить группу</H4>
    <Text2>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nihil magni mollitia repellat quaerat inventore
      officia saepe similique temporibus corporis.
    </Text2>
  </Card>
);

export const card = Template.bind({});
card.args = {};
card.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.BETA],
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
