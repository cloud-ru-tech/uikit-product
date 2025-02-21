import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionPromoList, SectionPromoListProps } from '../src';
import promoListImage from './assets/promo-list-image.png';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/PromoList',
  component: SectionPromoList,
};

export default meta;

type StoryProps = SectionPromoListProps;

const Template: StoryFn<StoryProps> = ({ id, layoutType, image, ...rest }) => (
  <div className={styles.resizeWrapper}>
    <SectionPromoList id={id} image={image ?? promoListImage} layoutType={layoutType} {...rest} />
  </div>
);

export const promoList: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-promo-list',
    layoutType: 'desktop',
    title: 'Section Title',
    description: 'Description',
    image: promoListImage,
    leftList: {
      title: 'Title',
      items: [
        'List item description',
        'List item description',
        'List item description',
        'List item description',
        'Long long long long long long long long List item description',
      ],
    },
    rightList: {
      title: 'Title',
      items: [
        'List item description',
        'List item description',
        'Long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long List item description',
        'List item description',
        'List item description',
        'List item description',
      ],
    },
  },
  argTypes: {
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?m=auto&node-id=7369-475592&t=6PG0wWrr0AIK5xSu-1',
    },
  },
};
