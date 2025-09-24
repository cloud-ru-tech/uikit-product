import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ArticleLinks, ArticleLinksProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Article/Links',
  component: ArticleLinks,
};
export default meta;

const Template: StoryFn<ArticleLinksProps> = ({ ...args }) => (
  <div className={styles.whiteWrapper}>
    <ArticleLinks {...args} />
  </div>
);

export const links: StoryObj<ArticleLinksProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    links: [
      { id: 'ftp-protocol', text: 'Суть FTP протокола' },
      { id: 'how-ftp-works', text: 'Как работает File Transfer Protocol' },
      { id: 'ftp-safety', text: 'Что обеспечивает безопасность данных при передаче по FTP' },
      { id: 'ftp-benefits', text: 'В чем преимущества и недостатки FTP' },
      { id: 'cloud-storages', text: 'Облачные хранилища на замену FTP-серверам' },
      { id: 'main-ideas', text: 'Главные мысли' },
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
