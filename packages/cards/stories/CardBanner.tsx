import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@sbercloud/uikit-product-button';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardBanner, CardBannerProps } from '../src';

const meta: Meta = {
  title: 'Components/Cards/Card/Banner',
  component: CardBanner,
};
export default meta;

const Wrapper = styled.div`
  width: 584px;
  height: 240px;
  padding: 20px;
  min-width: 500px;
  resize: horizontal;
  overflow: auto;
`;

function Template({ ...args }: CardBannerProps) {
  return (
    <Wrapper>
      <CardBanner {...args} />
    </Wrapper>
  );
}

export const banner: StoryFn<CardBannerProps> = Template.bind({});
banner.args = {
  title: 'Есть контент для DataHub?',
  description: 'Разместите свой контент на платформе и привлекайте новых клиентов',
  src: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
  buttons: [{ text: 'Button', variant: Button.variants.Transparent }],
};

banner.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=632%3A0',
  },
};
