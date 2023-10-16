import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { DatasetDisplaySVG, DockerRegistryDisplaySVG, RocketInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardCategory, CardCategoryProps } from '../src';

const meta: Meta = {
  title: 'Components/Cards/Card/Category',
  component: CardCategory,
};
export default meta;

const ICONS = {
  docker: <DockerRegistryDisplaySVG />,
  dataset: <DatasetDisplaySVG />,
  rocket: <RocketInterfaceSVG />,
};

const defaultArgs: CardCategoryProps = {
  title: 'Контейнеры',
  description: 'С популярными библиотеками и инструментами',
  icon: <DockerRegistryDisplaySVG />,
  variant: CardCategory.variants.Filled,
  onClick: () => {},
};

const Wrapper = styled.div`
  width: 400px;
  min-width: 300px;
  height: 128px;
  padding: 20px;
  margin-bottom: 20px;
  resize: horizontal;
  overflow: auto;
`;

function Template({ ...args }: CardCategoryProps) {
  return (
    <>
      Controlled:
      <Wrapper>
        <CardCategory {...args} />
      </Wrapper>
      Examples:
      {Object.values(CardCategory.variants).map((variant, index) => (
        <Wrapper key={`${index}${variant}`}>
          <CardCategory {...defaultArgs} variant={variant} />
        </Wrapper>
      ))}
    </>
  );
}

export const category: StoryFn<CardCategoryProps> = Template.bind({});
category.args = {
  title: 'Контейнеры',
  description: 'С популярными библиотеками и инструментами',
  icon: <DockerRegistryDisplaySVG />,
  variant: CardCategory.variants.Filled,
};

category.argTypes = {
  icon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'radio',
    },
  },
  variant: {
    options: Object.values({ ...CardCategory.variants }),
    control: {
      type: 'radio',
    },
  },
};

category.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  badges: [BADGE.STABLE],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=632%3A0',
  },
};
