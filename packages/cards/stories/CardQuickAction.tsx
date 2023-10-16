import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { DatasetDisplaySVG, DockerRegistryDisplaySVG, RocketInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardQuickAction, CardQuickActionProps } from '../src';

const meta: Meta = {
  title: 'Components/Cards/Card/Quick Action',
  component: CardQuickAction,
};
export default meta;

const ICONS = {
  docker: <DockerRegistryDisplaySVG />,
  dataset: <DatasetDisplaySVG />,
  rocket: <RocketInterfaceSVG />,
};

const defaultArgs = {
  title: 'Заголовок',
  description: 'Описание в 1 строку',
  icon: <DockerRegistryDisplaySVG />,
  onClick: () => {},
};

const Wrapper = styled.div`
  width: 400px;
  height: 80px;
  min-width: 285px;
  margin-bottom: 20px;
  resize: horizontal;
  overflow: auto;
  padding: 20px;
`;

function Template({ ...args }: CardQuickActionProps) {
  return (
    <>
      Controlled:
      <Wrapper>
        <CardQuickAction {...args} />
      </Wrapper>
      Examples:
      {Object.values(CardQuickAction.variants).map((variant, index) => (
        <Wrapper key={`${index}${variant}`}>
          <CardQuickAction {...defaultArgs} variant={variant} />
        </Wrapper>
      ))}
    </>
  );
}

export const quickAction: StoryFn<CardQuickActionProps> = Template.bind({});

quickAction.args = {
  title: 'Заголовок',
  description: 'Описание в 1 строку',
  icon: <DockerRegistryDisplaySVG />,
  variant: CardQuickAction.variants.Primary,
};

quickAction.argTypes = {
  icon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'radio',
    },
  },
};

quickAction.parameters = {
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
