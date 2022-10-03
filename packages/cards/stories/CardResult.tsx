import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardResult, CardResultProps } from '../src';

export default {
  title: 'Components/Cards/Card/Result',
  component: CardResult,
} as Meta;

const Wrapper = styled.div`
  width: 452px;
  height: 124px;
  padding: 20px;
  resize: horizontal;
  overflow: auto;
`;

const Template: Story<CardResultProps> = ({ ...args }) => (
  <Wrapper>
    <CardResult {...args} />
  </Wrapper>
);

export const result = Template.bind({});
result.args = {
  title: 'Platform · Product Name',
  description:
    'Легко конфигурируемый и масштабируемый виртуальный сервер. Предоставляет виртуальные машины для любых сценариев использования',
};

result.parameters = {
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
