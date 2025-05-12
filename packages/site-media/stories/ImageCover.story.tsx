import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ImageCover, ImageCoverProps } from '../src';
import imagePlaceholder from './assets/imagePlaceholder.png';

const meta: Meta = {
  title: 'Site/Media/ImageCover',
  component: ImageCover,
};

type StoryProps = ImageCoverProps;

const Template: StoryFn<StoryProps> = ({ image = imagePlaceholder, ...args }) => <ImageCover image={image} {...args} />;

export const imageCover: StoryObj<StoryProps> = {
  render: Template,
  args: {
    alt: 'Картинка',
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/-LIB--SITE--Product-UI-Kit?node-id=3500-81497',
    },
  },
};

export default meta;
