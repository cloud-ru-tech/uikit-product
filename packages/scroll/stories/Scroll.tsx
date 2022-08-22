import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Scroll, ScrollProps } from '../src';
import { ThemeWrapper } from './helperComponents';

export default {
  title: 'Components/Scroll',
  component: Scroll,
} as Meta;

const OverflownContent = styled.p`
  width: 600px;
`;

const ChildWithOverflow = styled.div`
  background-color: #ccc;
  height: 200px;
`;

const Template: Story<ScrollProps & { showWrapperPadding: boolean }> = ({
  variant,
  flexbox,
  showWrapperPadding,
  ...args
}) => (
  <ThemeWrapper variant={variant} flexbox={flexbox} showWrapperPadding={showWrapperPadding}>
    <Scroll variant={variant} flexbox={flexbox} {...args}>
      <>
        {[...Array(20)].map((x, i) => (
          <OverflownContent key={i}>
            {i} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada finibus felis at mollis.
          </OverflownContent>
        ))}
        <ChildWithOverflow>
          <Scroll variant={variant} flexbox={flexbox} {...args}>
            {[...Array(5)].map((x, i) => (
              <OverflownContent key={i}>
                {i} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada finibus felis at mollis.
              </OverflownContent>
            ))}
          </Scroll>
        </ChildWithOverflow>
      </>
    </Scroll>
  </ThemeWrapper>
);

export const scroll = Template.bind({});
scroll.args = {
  variant: Scroll.variants.Primary,
  size: Scroll.sizes.Medium,
  flexbox: false,
  showWrapperPadding: true,
};
scroll.argTypes = {
  showWrapperPadding: {
    type: 'boolean',
    name: '[Story]: Show wrapper padding',
  },
};
scroll.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=4323%3A66256',
  },
  badges: [BADGE.STABLE],
};
