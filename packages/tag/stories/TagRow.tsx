import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TagRow, TagRowProps } from '../src';

export default {
  title: 'Not stable/Tag/Tag Row',
  component: TagRow,
} as Meta;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #000;
  background: #fff;
  width: 50%;
`;

const Template: Story<TagRowProps> = ({ ...args }) => (
  <Column>
    <TagRow {...args} className={'test1'} />
  </Column>
);

export const tagRow = Template.bind({});
tagRow.args = {
  tags: Array.from(Array(20), (x, index) => index.toLocaleString() + 'x'.repeat(Math.ceil(Math.random() * 5))),
};
tagRow.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
