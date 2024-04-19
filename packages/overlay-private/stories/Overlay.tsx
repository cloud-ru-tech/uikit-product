import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { SwitchRow } from '@sbercloud/uikit-product-switch-row';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { OverlayPrivate, OverlayPrivateProps } from '../src';

const meta: Meta = {
  title: 'Components/Overlay Private',
  component: OverlayPrivate,
};
export default meta;

const Container = styled.div`
  width: 400px;
  height: 100%;
  background-color: ${themeVars.sys.neutral.background2Level};
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
`;

function Template({ ...args }: OverlayPrivateProps) {
  const [isEnabled, setEnabled] = useState(false);

  return (
    <Container>
      {isEnabled && <OverlayPrivate {...args} />}

      <SwitchRow data-test-id='toggle_overlay' title='toggle overlay' checked={isEnabled} onChange={setEnabled} />
    </Container>
  );
}

export const overlayPrivate: StoryFn<OverlayPrivateProps> = Template.bind({});

overlayPrivate.args = {};
overlayPrivate.argTypes = {};
overlayPrivate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=1015%3A1',
  },
  badges: [BADGE.STABLE, BADGE.PRIVATE],
};
