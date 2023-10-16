import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@sbercloud/uikit-product-button';
import { CircleAddInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardWide, CardWideProps } from '../src';

const meta: Meta = {
  title: 'Components/Cards/Card/Wide',
  component: CardWide,
};
export default meta;

const Wrapper = styled.div`
  height: 332px;
  min-height: 300px;
  padding: 20px;
  resize: vertical;
  overflow: auto;
`;

function Template({ ...args }: CardWideProps) {
  return (
    <Wrapper>
      <CardWide {...args} />
    </Wrapper>
  );
}

export const wide: StoryFn<CardWideProps> = Template.bind({});
wide.args = {
  title: 'GOLOS by SberDevices: 1240 часов аудиоданных',
  titleImageSrc:
    'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
  description: 'Самый большой размеченый вручную датасет на русском языке и обученная на них модель распознавания речи',
  imageSrc:
    'https://images.unsplash.com/photo-1560507074-b9eb43faab00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  buttons: [
    { text: 'Купить', icon: <CircleAddInterfaceSVG /> },
    { text: 'Подробнее', variant: Button.variants.Transparent },
  ],
};

wide.parameters = {
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
