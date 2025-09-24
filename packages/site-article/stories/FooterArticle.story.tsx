import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FooterArticle, FooterArticleProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Article/FooterArticle',
  component: FooterArticle,
};
export default meta;

const Template: StoryFn<FooterArticleProps> = ({ ...args }) => (
  <div className={styles.whiteWrapper}>
    <FooterArticle {...args} />
  </div>
);

const noop = () => {};

export const footerArticle: StoryObj<FooterArticleProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    releaseDate: '24 сентября 2025',
    dropdownOptions: [
      { type: 'telegram', onClick: noop },
      { type: 'vk', onClick: noop },
      { type: 'copy', onClick: noop },
    ],
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/-LIB--SITE--Product-UI-Kit?node-id=17239-4445&t=NR1mOGmYhZpy2gru-0',
    },
  },
};
