import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Rating, RatingProps } from '../src';

const meta: Meta = {
  title: 'Console/Rating',
  component: Rating,
};
export default meta;

function Template({ ...args }: RatingProps) {
  const [mark, setMark] = useState<number | undefined>(undefined);

  const handleRatingChange = (value: number) => setMark(value);

  return <Rating {...args} value={args.value || mark} onChange={handleRatingChange} />;
}

export const rating: StoryObj<RatingProps> = {
  render: Template,
  args: { elements: 5 },
  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.BETA],
    design: {
      name: 'Figma',
      type: 'figma',
      //TODO
    },
  },
};
