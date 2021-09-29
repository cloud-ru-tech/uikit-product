import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-react-button';
import { CopyInput } from '@sbercloud/uikit-react-input';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { copyToClipboard as Copy } from '../src/';

export default {
  title: 'Utils/Copy To Clipboard',
} as Meta;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 4px;
`;

const Template: Story = () => (
  <Wrapper>
    <CopyInput value={`import { copyToClipboard } from '@sbercloud/uikit-utils';`} />
    <Button text={'Hello, world!'} onClick={() => Copy('Hello, world!')} />
  </Wrapper>
);

export const copyToClipboard = Template.bind({});
copyToClipboard.args = {};
copyToClipboard.argTypes = {};
copyToClipboard.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
};
