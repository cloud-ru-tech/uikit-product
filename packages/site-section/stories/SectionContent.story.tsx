import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionContent, SectionContentProps } from '../src';
import { SECTION_COLORS } from '../src/constants';
import imageSrc from './assets/blogCarouselItemBg.png';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Content',
  component: SectionContent,
};
export default meta;

type StoryProps = SectionContentProps & {
  showTitle?: boolean;
  showButton?: boolean;
  mediaType: 'image' | 'video';
};

const Template: StoryFn<StoryProps> = ({
  showTitle,
  showButton,
  id,
  title,
  description,
  button,
  backgroundColor,
  ...args
}) => (
  <div className={styles.resizeWrapper}>
    <SectionContent
      {...args}
      id={id}
      title={showTitle ? title : undefined}
      description={showTitle ? description : undefined}
      button={showButton ? button : undefined}
      backgroundColor={backgroundColor}
    />
  </div>
);

export const content: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-content',
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
    showButton: true,
    button: {
      label: 'Button',
    },
  },
  argTypes: {
    backgroundColor: { control: { type: 'select' } },
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
    showButton: {
      name: '[Stories]: show button',
      control: { type: 'boolean' },
    },
    button: {
      if: { arg: 'showButton', eq: true },
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
