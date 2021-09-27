import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FileUpload, FileUploadProps } from '../src';

export default {
  title: 'Not stable/FileUpload/File Upload',
  component: FileUpload,
} as Meta;

const Template: Story<FileUploadProps> = ({ ...args }) => <FileUpload {...args} />;

export const fileUpload = Template.bind({});
fileUpload.args = {
  name: 'Загрузить',
  isMultiple: true,
  onFileSelected: e => console.warn('file \n\n', e.target.files),
};

fileUpload.argTypes = {
  name: {
    control: {
      required: true,
      type: 'text',
    },
  },
};

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
