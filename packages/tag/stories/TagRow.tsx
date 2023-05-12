import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TagRow, TagRowItem, TagRowProps } from '../src';

export default {
  title: 'Components/Tag/Tag Row',
  component: TagRow,
} as Meta;

const Template: StoryFn<TagRowProps & { showRemoveButtons: boolean }> = ({ items, ...args }) => {
  const [tags, setTags] = useState(items);
  const removeTag = (item: TagRowItem['value']) => setTags(x => x.filter(({ value }) => value !== item));

  return <TagRow {...args} items={tags} onItemRemove={args.showRemoveButtons ? removeTag : undefined} />;
};

export const tagRow = Template.bind({});
tagRow.args = {
  showRemoveButtons: false,
  items: [
    {
      value: '0xxxx',
      color: TagRow.colors.Red,
    },
    {
      value: '1xxxxx',
      color: TagRow.colors.Purple,
    },
    {
      value: '2xxx',
      color: TagRow.colors.Brown,
    },
    {
      value: '3xxx',
      color: TagRow.colors.Gray,
    },
    {
      value: '4x',
      color: TagRow.colors.Brown,
    },
    {
      value: '5xxxxx',
      color: TagRow.colors.Purple,
    },
    {
      value: '6xx',
      color: TagRow.colors.Yellow,
    },
    {
      value: '7xxxxx',
      color: TagRow.colors.Yellow,
    },
    {
      value: '8xxxxx',
      color: TagRow.colors.Green,
    },
    {
      value: '9xxxxx',
      color: TagRow.colors.Blue,
    },
    {
      value: '10xx',
      color: TagRow.colors.Blue,
    },
    {
      value: '11x',
      color: TagRow.colors.Brown,
    },
    {
      value: '12x',
      color: TagRow.colors.Brown,
    },
    {
      value: '13xx',
      color: TagRow.colors.Gray,
    },
    {
      value: '14xxxx',
      color: TagRow.colors.Gray,
    },
    {
      value: '15xxxx',
      color: TagRow.colors.Pink,
    },
    {
      value: '16x',
      color: TagRow.colors.Orange,
    },
    {
      value: '17xxxx',
      color: TagRow.colors.Pink,
    },
    {
      value: '18xxxxx',
      color: TagRow.colors.Brown,
    },
    {
      value: '19xxxx',
      color: TagRow.colors.Green,
    },
  ],
};
tagRow.argTypes = {
  showRemoveButtons: {
    type: 'boolean',
    name: '[Stories]: show remove buttons',
  },
};
tagRow.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=4736%3A66452',
  },
};
