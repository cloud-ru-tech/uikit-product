import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Rating, RatingProps } from '../src';

export default {
  title: 'Not stable/Rating',
  component: Rating,
} as Meta;

const Template: StoryFn<RatingProps> = ({ ...args }) => {
  const [mark, setMark] = useState<number | undefined>(undefined);

  const handleRatingChange = (value: number) => setMark(value);

  return <Rating {...args} value={args.value || mark} onChange={handleRatingChange} />;
};

export const rating = Template.bind({});
rating.args = { elements: 5 };
rating.argTypes = {};
rating.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.BETA],
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
  },
};
