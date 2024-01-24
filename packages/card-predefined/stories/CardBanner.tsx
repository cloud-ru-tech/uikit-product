import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardBanner, CardBannerProps } from '../src';
import cardImg from './cardImg.jpg';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack Uikit/Cards/Banner',
  component: CardBanner,
};
export default meta;

function Template({ ...args }: CardBannerProps) {
  return (
    <div className={styles.cardBanner}>
      <CardBanner {...args} />
    </div>
  );
}

export const banner: StoryFn<CardBannerProps> = Template.bind({});
banner.args = {
  title: 'Название сервиса, написанное в 1-2 строки',
  description: 'Подпись, которая может занимать высоту в 1-2 строки',
  actionLabel: 'Призыв к действию',
  image: {
    src: cardImg,
    alt: '',
  },
};

banner.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  badges: [BADGE.STABLE],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=534%3A12605&mode=design&t=rA1Ijc6tEN0NY1zg-1',
  },
};
