import { Meta, Story } from '@storybook/react/types-6-0';

import { Button, ButtonRound } from '@sbercloud/uikit-react-button';
import { FileUploadFilledInterfaceSVG } from '@sbercloud/uikit-react-icons';

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
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
  badges: [BADGE.BETA],
};
