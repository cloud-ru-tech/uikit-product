import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionMedia, SectionMediaProps } from '../src';
import imagePlaceholder from './assets/imagePlaceholder.png';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Media',
  component: SectionMedia,
};

export default meta;

type StoryProps = SectionMediaProps & {
  mediaType: 'image' | 'video';
};

const Template: StoryFn<StoryProps> = props => (
  <div className={styles.resizeWrapper}>
    <SectionMedia {...props} />
  </div>
);

export const media: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-media',
    title: 'Section Title',
    layoutType: 'desktop',
    mediaType: 'video',
    image: {
      src: imagePlaceholder,
    },
    // @ts-expect-error union with only one possible type of media
    video: {
      src: 'https://cdn.cloud.ru/backend/video/evolution-bare-metal/lk.mp4',
      poster: 'https://cdn.cloud.ru/backend/images/video-player/preview_default.png',
      controls: true,
    },
  },
  argTypes: {
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=7612-590099',
    },
  },
};
