import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ImageUpload, ImageUploadProps } from '../src';

const meta: Meta = {
  title: 'Not stable/FileUpload/Image Upload',
  component: ImageUpload,
};
export default meta;

function Template({ ...args }: ImageUploadProps) {
  return <ImageUpload {...args} />;
}

export const imageUpload: StoryFn<ImageUploadProps> = Template.bind({});
imageUpload.args = {
  infoText: (
    <>
      JPG, GIF или PNG. <br /> Максимальный размер 800 Kb
    </>
  ),
  maxFileSize: 819200,
  uploadButtonName: 'Выбрать файл',
  onImageSelected: (img: File) => console.warn('IMAGE \n\n', img),
};

imageUpload.argTypes = {};

imageUpload.parameters = {
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
