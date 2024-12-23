import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardList, CardListProps } from '../src';

const meta: Meta = {
  title: 'Site/Cards/CardList',
  component: CardList,
};
export default meta;

const Template: StoryFn<CardListProps> = ({ ...args }) => <CardList {...args} />;

export const cardList: StoryObj<CardListProps> = {
  render: Template,
  args: {},
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      //TODO: update to the correct one
      url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
    },
  },
};
