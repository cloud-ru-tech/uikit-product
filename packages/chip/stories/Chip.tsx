import { styled } from '@linaria/react';
import { useEffect } from '@storybook/preview-api';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Chip, ChipProps } from '../src';

export default {
  title: 'Components/Chip',
  component: Chip,
} as Meta;

const Wrapper = styled.div`
  padding: 20px;
  border-radius: 8px;
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
`;

const Template: StoryFn<ChipProps> = ({ checked, ...args }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => setIsChecked(checked), [checked]);

  return (
    <Wrapper>
      <Chip {...args} handleChange={checked => setIsChecked(checked)} checked={isChecked} />
    </Wrapper>
  );
};

export const chip = Template.bind({});
chip.args = {
  label: 'Chip',
  size: Chip.sizes.Medium,
  variant: Chip.variants.Primary,
  checked: false,
};
chip.argTypes = {};
chip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=5839%3A83547',
  },
};
