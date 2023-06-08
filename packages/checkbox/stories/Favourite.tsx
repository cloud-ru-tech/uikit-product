import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Favourite, FavouriteProps } from '../src';

const meta: Meta = {
  title: 'Components/Checkbox/Favourite',
  component: Favourite,
};
export default meta;

const FavouriteWrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: fit-content;
`;

function Template({ checked, ...args }: FavouriteProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <FavouriteWrap>
      <Favourite {...args} checked={isChecked} handleChange={isChecked => setIsChecked(isChecked)} />
    </FavouriteWrap>
  );
}

export const favourite: StoryFn<FavouriteProps> = Template.bind({});
favourite.args = { checked: false };
favourite.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3223%3A46057',
  },
};
