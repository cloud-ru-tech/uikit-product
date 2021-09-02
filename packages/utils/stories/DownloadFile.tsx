import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-react-button';
import { CopyInput } from '@sbercloud/uikit-react-input';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { downloadFile as fileDownloader } from '../src/';

export default {
  title: 'Utils/Download File',
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
    <CopyInput value={`import { downloadFile } from '@sbercloud/uikit-utils';`} />
    <Button text={'Скачать в действии'} onClick={() => fileDownloader('Hello, world!', 'example.txt')} />
  </Wrapper>
);

export const downloadFile = Template.bind({});
downloadFile.args = {};
downloadFile.argTypes = {};
downloadFile.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
};
