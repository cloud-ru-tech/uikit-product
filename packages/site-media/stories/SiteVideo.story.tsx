import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SiteVideo, SiteVideoProps, VideoPlayerProps } from '../src';

const meta: Meta = {
  title: 'Site/Media/Video',
  component: SiteVideo,
};
export default meta;

const SOURCES = {
  mp4: 'https://cdn.cloud.ru/backend/video/evolution-bare-metal/lk.mp4',
  youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  rutube: 'https://rutube.ru/play/embed/372b4a7349d5fe32dd249b8e901b8eb7/',
};

const NATIVE_PLAYER_ARG_TYPE = { if: { arg: 'source', eq: 'mp4' } };

type StoryProps = Omit<SiteVideoProps, 'video'> &
  Omit<VideoPlayerProps, 'src'> & {
    source: keyof typeof SOURCES;
  };

const Template: StoryFn<StoryProps> = ({ source, poster, controls, autoPlay, muted, loop, ...args }) => (
  <SiteVideo {...args} video={{ src: SOURCES[source], poster, controls, autoPlay, muted, loop }} />
);

export const video: StoryObj<StoryProps> = {
  render: Template,
  args: {
    source: 'mp4',
    poster: 'https://cdn.cloud.ru/backend/images/video-player/preview_default.png',
    controls: true,
    autoPlay: false,
    muted: false,
    loop: false,
    layoutType: 'desktop',
  },
  argTypes: {
    source: {
      name: '[Story]: Source',
      options: Object.keys(SOURCES),
      control: { type: 'radio' },
    },
    poster: NATIVE_PLAYER_ARG_TYPE,
    controls: NATIVE_PLAYER_ARG_TYPE,
    autoPlay: NATIVE_PLAYER_ARG_TYPE,
    muted: NATIVE_PLAYER_ARG_TYPE,
    loop: NATIVE_PLAYER_ARG_TYPE,
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
