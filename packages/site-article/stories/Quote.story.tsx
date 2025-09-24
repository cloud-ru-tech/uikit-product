import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Quote, QuoteProps } from '../src';
import articleAuthor from './assets/square.webp';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Article/Quote',
  component: Quote,
};
export default meta;

const Template: StoryFn<QuoteProps> = ({ ...args }) => (
  <div className={styles.whiteWrapper}>
    <Quote {...args} />
  </div>
);

export const quote: StoryObj<QuoteProps> = {
  render: Template,
  args: {
    text: 'Secure File Transfer Protocol (SFTP) - еще одно дополнительное расширение для FTP, гарантирующее безопасную передачу файлов между клиентом и сервером в глобальной сети',
    image: articleAuthor,
    name: 'Ирина Городецкая',
    position: 'руководитель направления по работе с клиентами Cloud.ru',
    layoutType: 'desktop',
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/-LIB--SITE--Product-UI-Kit?node-id=17239-4386',
    },
  },
};
