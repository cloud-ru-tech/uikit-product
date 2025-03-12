import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { CardMedia, CardMediaProps } from 'site-cards/src/components/CardMedia';

import { APPEARANCE, TagProps } from '@snack-uikit/tag';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import img from './assets/CardMedia.webp';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Cards/Card Media',
  component: CardMedia,
};

export default meta;

type StoryProps = CardMediaProps & {
  tagTitle: string;
  tagAppearance: TagProps['appearance'];
};

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <div data-size={args.size} className={styles.mediaWrapper}>
    <CardMedia
      {...args}
      tag={{
        label: args.tagTitle,
        appearance: args.tagAppearance,
      }}
    />
  </div>
);

export const cardMedia: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Что такое FTP-протокол и как настроить FTP сервер ',
    time: '12',
    date: '23 августа 2025',
    tagTitle: 'Сервисы',
    tagAppearance: 'neutral',
    img: img,
    size: 's',
    href: '#',
    disabled: false,
    layoutType: 'desktop',
    onClick: () => alert('router push'),
    target: '_self',
  },
  argTypes: {
    tagTitle: {
      name: '[Story] Tag title',
    },
    tagAppearance: {
      name: '[Story] Tag appearance',
      options: Object.values(APPEARANCE),
      control: 'select',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/EZGRixENHOVEUln8Rb3IE9/Card-media?node-id=3228-48047&m=dev',
    },
  },
};
