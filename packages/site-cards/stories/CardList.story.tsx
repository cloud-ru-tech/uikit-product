import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardList, CardListProps } from '../src';

const meta: Meta = {
  title: 'Site/Cards/Card List',
  component: CardList,
};
export default meta;

const Template: StoryFn<CardListProps> = ({ ...args }) => <CardList {...args} />;

export const cardList: StoryObj<CardListProps> = {
  render: Template,
  args: {
    title: 'Title',
    layoutType: LAYOUT_TYPE.Desktop,
    href: '#',
    tags: [
      {
        text: 'Регистрация открыта',
        appearance: 'violet',
      },
      {
        text: 'Advanced',
        appearance: 'neutral',
        tip: 'tip',
      },
    ],
    img: 'https://cdn.cloud.ru/backend/webinars-images/kuber4.png',
    labelDate: 'XX месяц 202X',
    'data-test-id': 'card-event',
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3619-73555&m=dev',
    },
  },
};
