import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { RatingBar, RatingBarProps } from '../src';

export default {
  title: 'Not stable/RatingBar',
  component: RatingBar,
} as Meta;

const Template: Story<RatingBarProps> = ({ ...args }) => {
  const [mark, setMark] = useState<string | undefined>(undefined);

  const handleRatingChange = (value: string) => setMark(value);

  return <RatingBar {...args} value={mark} onChange={handleRatingChange} />;
};

export const ratingBar = Template.bind({});
ratingBar.args = { elements: 5 };
ratingBar.argTypes = {};
ratingBar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
  },
};
