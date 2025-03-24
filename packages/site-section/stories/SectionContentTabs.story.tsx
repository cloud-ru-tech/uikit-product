import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionContentTabs, SectionContentTabsProps } from '../src';
import { SECTION_COLORS } from '../src/constants';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Content Tabs',
  component: SectionContentTabs,
};
export default meta;

type StoryProps = SectionContentTabsProps & {
  showTitle?: boolean;
  showMediaContent?: boolean;
  showButton?: boolean;
  mediaType: 'image' | 'video';
  imageSrcExample?: string;
  videoSrcExample?: string;
  videoPosterExample?: string;
  titleExample?: string;
  subtitleExample?: string;
  descriptionExample?: string;
};

const Template: StoryFn<StoryProps> = ({
  showTitle,
  showButton,
  showMediaContent,
  titleExample,
  subtitleExample,
  descriptionExample,
  imageSrcExample,
  videoSrcExample,
  videoPosterExample,
  id,
  title,
  button,
  backgroundColor,
  ...args
}) => (
  <div className={styles.resizeWrapper}>
    <SectionContentTabs
      {...args}
      id={id}
      title={showTitle ? title : undefined}
      button={showButton ? button : undefined}
      backgroundColor={backgroundColor}
      tabs={new Array(5).fill('media').map((id, index) => ({
        id: `${id}-${index}`,
        title: index > 0 ? 'Title text' : 'Long Long Long Long Long Long Long Long Title text',
        mediaTitle: showMediaContent ? titleExample : undefined,
        mediaSubtitle: showMediaContent ? subtitleExample : undefined,
        mediaDescription: showMediaContent ? descriptionExample : undefined,
        image: (imageSrcExample
          ? {
              src: imageSrcExample,
              alt: '',
            }
          : undefined) as typeof videoSrcExample extends string ? never : undefined,
        video: videoSrcExample
          ? {
              src: videoSrcExample,
              poster: videoPosterExample ?? '',
              controls: true,
            }
          : undefined,
        onPlay: () => {},
      }))}
    />
  </div>
);

export const contentTabs: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-content-tabs',
    layoutType: LAYOUT_TYPE.Desktop,
    backgroundColor: SECTION_COLORS.NeutralBackground,
    showTitle: true,
    title: 'Section Title',
    showMediaContent: true,
    titleExample: 'Media Title',
    subtitleExample: 'Media Subtitle',
    descriptionExample: 'Media Description',
    showButton: true,
    button: {
      label: 'Button',
    },
    mediaType: 'image',
    imageSrcExample: 'https://cdn.cloud.ru/backend/images/partners/advantage.png',
    videoSrcExample: 'https://cdn.cloud.ru/backend/video/evolution-bare-metal/lk.mp4',
    videoPosterExample: 'https://cdn.cloud.ru/backend/images/video-player/preview_default.png',
  },
  argTypes: {
    backgroundColor: { control: { type: 'select' } },
    mediaType: {
      name: '[Story]: Media type',
      options: ['image', 'video'],
      control: {
        type: 'radio',
      },
    },
    imageSrcExample: {
      name: '[Stories]: image src',
      if: { arg: 'mediaType', eq: 'image' },
    },
    videoSrcExample: {
      name: '[Stories]: video src',
      if: { arg: 'mediaType', eq: 'video' },
    },
    videoPosterExample: {
      name: '[Stories]: video poster',
      if: { arg: 'mediaType', eq: 'video' },
    },
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
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
    showButton: {
      name: '[Stories]: show button',
      control: { type: 'boolean' },
    },
    button: {
      if: { arg: 'showButton', eq: true },
    },
    showMediaContent: {
      name: '[Stories]: show media content',
      control: { type: 'boolean' },
    },
    titleExample: {
      name: '[Stories]: media title',
      if: { arg: 'showMediaContent', eq: true },
    },
    subtitleExample: {
      name: '[Stories]: media subtitle',
      if: { arg: 'showMediaContent', eq: true },
    },
    descriptionExample: {
      name: '[Stories]: media description',
      if: { arg: 'showMediaContent', eq: true },
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
