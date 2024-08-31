import { Meta, StoryFn } from '@storybook/react';

import { toaster } from '@snack-uikit/toaster';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileCardBanner, MobileCardBannerProps } from '../src';
import cardImg from './cardImg.jpg';

const meta: Meta = {
  title: 'Mobile/Layout/Card Banner',
  component: MobileCardBanner,
};
export default meta;

type StoryProps = {
  showOnClose?: boolean;
} & MobileCardBannerProps;

function Template({ showOnClose, ...args }: StoryProps) {
  const handleClose = () => {
    toaster.userAction.neutral({ label: 'onClose click' });
  };

  return <MobileCardBanner {...args} onClose={showOnClose ? handleClose : undefined} />;
}

export const cardBanner: StoryFn<StoryProps> = Template.bind({});
cardBanner.args = {
  title: 'Название сервиса, написанное в 1-2 строки',
  description: 'Подпись, которая может занимать высоту в 1-2 строки',
  actionLabel: 'Призыв к действию',
  image: {
    src: cardImg,
    alt: '',
  },
  showOnClose: true,
};

cardBanner.argTypes = {
  showOnClose: {
    name: '[Stories]: show onClose action',
  },
};

cardBanner.parameters = {
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
