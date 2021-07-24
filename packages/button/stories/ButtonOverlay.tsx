import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';

import { EditInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { EXPORT_GLOBAL_CSS_VARS } from '@sbercloud/uikit-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonOverlay } from '../src';

export default {
  title: 'Not stable/Button/Button Overlay',
  component: ButtonOverlay,
} as Meta;

const Wrapper = styled.div`
  padding: 20px;
  border-radius: 8px;
  background-color: var(${EXPORT_GLOBAL_CSS_VARS.BACKGROUND_SECONDARY});
`;

const Template: Story<Pick<ComponentProps<typeof ButtonOverlay>, 'disabled'>> = ({ ...args }) => (
  <Wrapper>
    <ButtonOverlay title='Edit' {...args}>
      <EditInterfaceSVG />
    </ButtonOverlay>
  </Wrapper>
);

export const buttonOverlay = Template.bind({});

buttonOverlay.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=1103%3A24006',
  },
  controls: { include: ['disabled'] },
  badges: [BADGE.NEEDS_REVISION, BADGE.BETA],
};
buttonOverlay.args = {
  disabled: false,
};
