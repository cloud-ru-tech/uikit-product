import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@cloud-ru/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardPartner, CardPartnerProps } from '../src';
import logoSrc from './assets/DodoLogo.png';

const meta: Meta = {
  title: 'Site/Cards/Card Partner',
  component: CardPartner,
};

type StoryProps = CardPartnerProps;

const Template: StoryFn<StoryProps> = ({ ...args }) => <CardPartner {...args} />;

export const cardPartner: StoryObj<StoryProps> = {
  render: Template,
  args: {
    description:
      'Description Sample Description Sample Description Sample Description Sample Description Sample Description Sample Description Sample Description Sample ',
    logo: { src: logoSrc, alt: 'dodo' },
    href: '#',
    target: '_blank',
    layoutType: LAYOUT_TYPE.Desktop,
  },
  argTypes: {
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
    onClick: {
      control: false,
    },
    className: {
      control: false,
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=2881-42422&m=dev',
    },
  },
};

export default meta;
