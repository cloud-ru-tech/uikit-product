import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useMemo } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { isVideoPlayerContent, SiteVideo, SiteVideoProps } from '../src';

const meta: Meta = {
  title: 'Site/Video',
  component: SiteVideo,
};
export default meta;

type StoryProps = SiteVideoProps & {
  customVideoPlayer: boolean;
  showControls: boolean;
};

const RUTUBE_URL = 'https://rutube.ru';
const SAMPLE_RUTUBE_VIDEO = `${RUTUBE_URL}/play/embed/372b4a7349d5fe32dd249b8e901b8eb7/`;

const Template: StoryFn<StoryProps> = ({ video: videoProp, showControls, customVideoPlayer, ...args }) => {
  const video = useMemo(() => {
    if (customVideoPlayer) {
      return (
        <iframe
          title={SAMPLE_RUTUBE_VIDEO}
          src={SAMPLE_RUTUBE_VIDEO}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      );
    }

    if (isVideoPlayerContent(videoProp)) {
      return {
        ...videoProp,
        controls: showControls,
      };
    }

    return videoProp;
  }, [customVideoPlayer, showControls, videoProp]);

  useEffect(() => {
    if (!customVideoPlayer) return;

    const handleEvent = (event: MessageEvent) => {
      if (event.origin && event.origin === RUTUBE_URL) {
        const message = JSON.parse(event.data);
        if (message.type === 'player:changeState' && message.data.state === 'playing') {
          window.removeEventListener('message', handleEvent);
        }
      }
    };

    window.addEventListener('message', handleEvent);
  }, [customVideoPlayer]);

  return <SiteVideo {...args} video={video} />;
};

export const video: StoryObj<StoryProps> = {
  render: Template,
  args: {
    customVideoPlayer: false,
    video: {
      src: 'https://cdn.cloud.ru/backend/video/evolution-bare-metal/lk.mp4',
      poster: 'https://cdn.cloud.ru/backend/images/video-player/preview_default.png',
    },
    showControls: true,
  },
  argTypes: {
    customVideoPlayer: {
      name: '[Story]: Custom video player',
      type: 'boolean',
    },
    video: {
      if: { arg: 'customVideoPlayer', neq: true },
    },
    showControls: {
      name: '[Story]: Show controls',
      type: 'boolean',
      if: { arg: 'customVideoPlayer', neq: true },
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
