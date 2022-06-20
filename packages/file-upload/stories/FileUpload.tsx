import { Meta, Story } from '@storybook/react/types-6-0';

import { Button, ButtonRound } from '@sbercloud/uikit-product-button';
import { FileUploadFilledInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FileUpload, FileUploadProps } from '../src';
import { Container } from './helperComponents';

export default {
  title: 'Not stable/FileUpload/File Upload',
  component: FileUpload,
} as Meta;

const Template: Story<FileUploadProps> = ({ ...args }) => (
  <Container>
    <FileUpload {...args}>
      <ButtonRound text='Загрузить' variant={ButtonRound.variants.OutlineAccent} />
    </FileUpload>
    <FileUpload {...args}>
      <Button text='Загрузить' variant={Button.variants.Transparent} icon={<FileUploadFilledInterfaceSVG />} />
    </FileUpload>
  </Container>
);

export const fileUpload = Template.bind({});
fileUpload.args = {
  isMultiple: true,
  onFileSelected: e => console.warn('file \n\n', e.target.files),
};

fileUpload.argTypes = {};

fileUpload.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=4238%3A66023',
  },
  badges: [BADGE.BETA],
};
