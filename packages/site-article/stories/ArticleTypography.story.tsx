import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ArticleTypography, ArticleTypographyProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Article/Typography',
  component: ArticleTypography,
};
export default meta;

const Template: StoryFn<ArticleTypographyProps> = ({ ...args }) => (
  <div className={styles.whiteWrapper}>
    <ArticleTypography {...args} />
  </div>
);

export const typography: StoryObj<ArticleTypographyProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    tag: 'p',
    type: 'body',
    children: 'Типографика',
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
