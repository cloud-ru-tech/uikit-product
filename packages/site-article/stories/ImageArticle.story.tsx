import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ImageArticle, ImageArticleProps } from '../src';
import image from './assets/image.webp';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Article/ImageArticle',
  component: ImageArticle,
};
export default meta;

const Template: StoryFn<ImageArticleProps> = ({ ...args }) => (
  <div className={styles.whiteWrapper}>
    <ImageArticle {...args} />
  </div>
);

export const imageArticle: StoryObj<ImageArticleProps> = {
  render: Template,
  args: {
    image: {
      src: image,
      alt: 'image',
    },
    description: 'Подпись к фотографии',
  },
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/-LIB--SITE--Product-UI-Kit?node-id=17239-4512',
    },
  },
};
