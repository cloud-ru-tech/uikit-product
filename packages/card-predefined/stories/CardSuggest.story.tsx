import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '../../../storybook/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardSuggest, CardSuggestProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Cards/Suggest',
  component: CardSuggest,
};
export default meta;

function Template({ ...args }: CardSuggestProps) {
  return (
    <div className={styles.wrapper}>
      <CardSuggest {...args} />
    </div>
  );
}

export const suggest: StoryObj<CardSuggestProps> = {
  render: Template,

  args: {
    title: 'Название сервиса, написанное в 2 строки',
    description: 'Подпись, которая может занимать высоту, которая помещается как раз в 3 строки',
  },

  parameters: {
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
  },
};
