import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Highlight, HighlightProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Article/Highlight',
  component: Highlight,
};
export default meta;

const Template: StoryFn<HighlightProps> = ({ ...args }) => (
  <div className={styles.whiteWrapper}>
    <Highlight {...args} />
  </div>
);

export const highlight: StoryObj<HighlightProps> = {
  render: Template,
  args: {
    richText:
      '<p>Secure File Transfer Protocol (SFTP) - еще одно дополнительное расширение для FTP, гарантирующее безопасную передачу файлов между клиентом и сервером в глобальной сети</p>',
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/-LIB--SITE--Product-UI-Kit?node-id=17239-4381',
    },
  },
};
