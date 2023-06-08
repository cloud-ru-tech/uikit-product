import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardResult, CardResultProps } from '../src';

const meta: Meta = {
  title: 'Components/Cards/Card/Result',
  component: CardResult,
};
export default meta;

const Wrapper = styled.div`
  width: 452px;
  height: 124px;
  padding: 20px;
  resize: horizontal;
  overflow: auto;
`;

function Template({ ...args }: CardResultProps) {
  return (
    <Wrapper>
      <CardResult {...args} />
    </Wrapper>
  );
}

export const result: StoryFn<CardResultProps> = Template.bind({});
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
