import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BlockBasic, BlockBasicProps } from '../src';

export default {
  title: 'Not stable/Layout/BlockBasic',
  component: BlockBasic,
} as Meta;

const Wrapper = styled.div`
  width: 500px;
  height: 300px;
  resize: both;
  overflow: auto;
`;

const exampleClassName = css`
  height: 100%;
`;

const Template: StoryFn<BlockBasicProps> = ({ ...args }) => (
  <Wrapper>
    <BlockBasic {...args} className={exampleClassName}>
      Какое-то содержимое
    </BlockBasic>
  </Wrapper>
);

export const blockBasic = Template.bind({});

blockBasic.args = {};

blockBasic.argTypes = {};

blockBasic.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?type=design&node-id=54759-267939&mode=dev',
  },
};
