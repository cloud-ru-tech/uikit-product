import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { EXPORT_VARS, GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Divider, DividerProps } from '../src';

const Container = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 10%;
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
`;

const meta: Meta = {
  title: 'Components/Divider',
  component: Divider,
};
export default meta;

function Template({ ...args }: DividerProps) {
  return (
    <Container>
      <Divider {...args} />
    </Container>
  );
}

export const divider: StoryFn<DividerProps> = Template.bind({});

divider.args = {
  'data-test-id': 'testId',
};

divider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=2914%3A42420',
  },
  badges: [BADGE.STABLE],
};
