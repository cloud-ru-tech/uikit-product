import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ImageUpload } from '../src';

export default {
  title: 'Not stable/FileUpload/Image Upload',
  component: ImageUpload,
} as Meta;

const Template: Story<any> = ({ ...args }) => <ImageUpload {...args} />;

export const imageUpload = Template.bind({});
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
