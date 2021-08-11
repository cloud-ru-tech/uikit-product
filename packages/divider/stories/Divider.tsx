import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { EXPORT_GLOBAL_CSS_VARS, EXPORT_VARS } from '@sbercloud/uikit-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Divider, DividerProps } from '../src';

const Container = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 10%;
  background-color: var(${EXPORT_GLOBAL_CSS_VARS.BACKGROUND_SECONDARY});
`;

export default {
  title: 'Components/Divider',
  component: Divider,
} as Meta;

const Template: Story<DividerProps> = ({ ...args }) => (
  <Container>
    <Divider {...args} />
  </Container>
);

export const divider = Template.bind({});

divider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=2914%3A42420',
  },
  badges: [BADGE.STABLE],
};
