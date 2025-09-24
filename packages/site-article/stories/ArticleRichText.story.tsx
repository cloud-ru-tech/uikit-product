import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ArticleRichText, ArticleRichTextProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Article/RichText',
  component: ArticleRichText,
};
export default meta;

const Template: StoryFn<ArticleRichTextProps> = ({ ...args }) => (
  <div className={styles.whiteWrapper}>
    <ArticleRichText {...args} />
  </div>
);

export const richText: StoryObj<ArticleRichTextProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    richText: '<p>Форматированный <b>текст</b></p>',
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
