import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BannerCard, BannerCardProps } from '../src';

export default {
  title: 'Not stable/Card/Banner Card',
  component: BannerCard,
} as Meta;

const handleClick = () => alert('Card alert');
const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  alert('Button alert');
};

const Template: Story<BannerCardProps> = ({ ...args }) => (
  <BannerCard {...args} onClick={handleClick} onButtonClick={handleButtonClick} />
);

export const bannerCard = Template.bind({});
bannerCard.args = {
  title: 'Карточка #1',
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore repudiandae ea eveniet, quis necessitatibus sequi dolorem quam veritatis officiis adipisci officia.',
  image: 'https://cdn.sbercloud.ru/frontend/ru/logo-192.png',
  buttonText: 'Alert',
};
bannerCard.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.BETA],
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
