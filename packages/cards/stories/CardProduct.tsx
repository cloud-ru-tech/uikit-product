import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import {
  ArrowBoldRightInterfaceSVG,
  DataCatalogServiceSVG,
  DatasetDisplaySVG,
  DockerRegistryDisplaySVG,
  RocketInterfaceSVG,
  SendInterfaceSVG,
} from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardProduct, CardProductProps } from '../src';

const ICONS = {
  docker: <DockerRegistryDisplaySVG />,
  dataset: <DatasetDisplaySVG />,
  rocket: <RocketInterfaceSVG />,
};
const ACTIONS = {
  goTo: {
    text: 'Перейти',
    icon: <ArrowBoldRightInterfaceSVG />,
    isAnimated: true,
  },
  leaveRequest: {
    text: 'Оставить заявку',
    icon: <SendInterfaceSVG />,
  },
};
const ON_CLICK = {
  onClick: () => {},
  undefined: undefined,
};

const meta: Meta = {
  title: 'Components/Cards/Card/Product',
  component: CardProduct,
};
export default meta;

const Wrapper = styled.div`
  display: flex;
  min-width: 246px;
  width: 400px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 40px;
  overflow: auto;
  resize: horizontal;
`;

function Template({ ...args }: CardProductProps) {
  return (
    <>
      Controlled:
      <Wrapper>
        <CardProduct {...args} />
      </Wrapper>
    </>
  );
}

export const product: StoryFn<CardProductProps> = Template.bind({});

product.args = {
  icon: <DataCatalogServiceSVG size={24} />,
  title:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  action: {
    text: 'Перейти',
    icon: <ArrowBoldRightInterfaceSVG />,
    isAnimated: true,
  },
  label: {
    text: 'Скидка 10%',
    variant: CardProduct.labelVariants.Green,
  },
  onClick: undefined,
} as CardProductProps;

product.argTypes = {
  icon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'radio',
    },
  },
  action: {
    name: 'action',
    options: Object.keys(ACTIONS),
    mapping: ACTIONS,
    control: {
      type: 'radio',
    },
  },
  onClick: {
    name: 'onClick',
    options: Object.keys(ON_CLICK),
    mapping: ON_CLICK,
    control: {
      type: 'radio',
    },
  },
};

product.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE, BADGE.NEEDS_REVISION],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=632%3A0&t=bVwt0WJd55FsindE-0',
  },
};
