import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardImage, CardImageProps } from '../src';

const meta: Meta = {
  title: 'Components/Cards/Card/Image',
  component: CardImage,
};
export default meta;

const Wrapper = styled.div`
  width: 400px;
  min-width: 240px;
  min-height: 300px;
  height: 350px;
  resize: both;
  overflow: auto;
`;

function Template({ ...args }: CardImageProps) {
  return (
    <Wrapper>
      <CardImage {...args} />{' '}
    </Wrapper>
  );
}

export const image: StoryFn<CardImageProps> = Template.bind({});
image.args = {
  title: 'Базовые образы',
  description: 'Готовые Docker-образы с популярными инструментами для обучения и инференса',
  signature: 'от ML Space',
  src: 'https://images.unsplash.com/photo-1646627927863-19874c27316b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
};

image.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  badges: [BADGE.STABLE],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=632%3A0',
  },
};
