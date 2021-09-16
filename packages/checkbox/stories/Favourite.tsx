import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Variants } from 'checkbox/src/components/Favourite/constants';
import { useEffect, useState } from 'react';

import { EXPORT_GLOBAL_CSS_VARS } from '@sbercloud/uikit-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Favourite, FavouriteProps } from '../src';

export default {
  title: 'Components/Checkbox/Favourite',
  component: Favourite,
} as Meta;

const FavouriteWrap = styled.div<{ isOnAccent: boolean }>`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: fit-content;
  background-color: ${({ isOnAccent }) =>
    isOnAccent ? `var(${EXPORT_GLOBAL_CSS_VARS.BACKGROUND_ACCENT})` : 'transparent'};
`;

const Template: Story<FavouriteProps> = ({ checked, ...args }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <FavouriteWrap isOnAccent={args.variant === Variants.OnAccent}>
      <Favourite {...args} checked={isChecked} handleChange={isChecked => setIsChecked(isChecked)} />
    </FavouriteWrap>
  );
};

export const favourite = Template.bind({});
favourite.args = {};
favourite.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=3223%3A46057',
  },
};
