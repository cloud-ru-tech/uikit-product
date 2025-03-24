import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionContentList, SectionContentListProps } from '../src';
import { SECTION_COLORS } from '../src/constants';
import imageSrc from './assets/blogCarouselItemBg.png';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Content List',
  component: SectionContentList,
};
export default meta;

type StoryProps = SectionContentListProps & {
  showTitle?: boolean;
  showItems?: boolean;
  mediaType: 'image' | 'video';
};

const Template: StoryFn<StoryProps> = ({ showTitle, showItems, title, description, items, ...args }) => (
  <div className={styles.resizeWrapper}>
    <SectionContentList
      {...args}
      title={showTitle ? title : undefined}
      description={showTitle ? description : undefined}
      items={showItems ? items : undefined}
    />
  </div>
);

export const contentList: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-content-list',
    layoutType: LAYOUT_TYPE.Desktop,
    backgroundColor: SECTION_COLORS.NeutralBackground,
    showTitle: true,
    title: 'Section Title Large',
    description: 'Description',
    contentPosition: 'left',
    mediaType: 'image',
    image: {
      src: imageSrc,
    },
    // @ts-expect-error union with only one possible type of media
    video: {
      src: 'https://cdn.cloud.ru/backend/video/evolution-bare-metal/lk.mp4',
      poster: 'https://cdn.cloud.ru/backend/images/video-player/preview_default.png',
      controls: true,
    },
    showItems: true,
    items: [
      { title: 'Section Title Link', titleLink: { href: '#' }, description: 'Description' },
      { title: 'Section Title Small', description: 'Description' },
      { title: 'Section Title Small', description: 'Description' },
      { title: 'Section Title Small', description: 'Description' },
    ],
  },
  argTypes: {
    backgroundColor: { control: { type: 'select' } },
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
    },
    video: {
      if: { arg: 'mediaType', eq: 'video' },
    },
    image: {
      if: { arg: 'mediaType', eq: 'image' },
    },
    mediaType: {
      name: '[Story]: Media type',
      options: ['image', 'video'],
      control: {
        type: 'radio',
      },
    },
    showTitle: {
      name: '[Stories]: show title',
      control: { type: 'boolean' },
    },
    title: {
      if: { arg: 'showTitle', eq: true },
    },
    description: {
      if: { arg: 'showTitle', eq: true },
    },
    contentPosition: {
      if: { arg: 'showTitle', eq: true },
    },
    showItems: {
      name: '[Stories]: show list',
      control: { type: 'boolean' },
    },
    items: {
      if: { arg: 'showItems', eq: true },
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=7687-325777',
    },
  },
};
