import { Meta, StoryFn } from '@storybook/react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardService, CardServiceProps } from '../src';
import cardImg from './cardImg.jpg';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack Uikit/Cards/Service',
  component: CardService,
};
export default meta;

type StoryProps = CardServiceProps & {
  emblemMode: 'icon' | 'image';
};

function Template({ emblemMode, ...args }: StoryProps) {
  const emblem: CardServiceProps['emblem'] =
    emblemMode === 'icon' ? { icon: PlaceholderSVG } : { src: cardImg, alt: '' };

  return (
    <div className={styles.wrapper}>
      <CardService {...args} emblem={emblem} />
    </div>
  );
}

export const service: StoryFn<StoryProps> = Template.bind({});
service.args = {
  title: 'Название сервиса, написанное в 2 строки',
  description: 'Подпись, которая может занимать высоту, которая помещается как раз в 3 строки',
  actionLabel: 'Призыв к действию',
  emblemMode: 'icon',
};

service.argTypes = {
  emblemMode: {
    name: '[Story]: Card emblem',
    options: ['icon', 'image'],
    defaultValue: 'icon',
    control: {
      type: 'radio',
    },
  },
};

service.parameters = {
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
