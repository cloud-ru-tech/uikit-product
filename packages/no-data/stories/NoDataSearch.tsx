import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NoDataSearch } from '../src/components';

export default {
  title: 'Components/No Data/No Data Search',
  component: NoDataSearch,
} as Meta;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Template: Story = props => (
  <Wrapper>
    <NoDataSearch {...props} />
  </Wrapper>
);

export const noDataSearch = Template.bind({});
noDataSearch.args = {};
noDataSearch.argTypes = {};
noDataSearch.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=241%3A0',
  },
};
