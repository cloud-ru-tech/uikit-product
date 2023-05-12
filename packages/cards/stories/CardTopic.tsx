import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { RocketInterfaceSVG, SupportInterfaceSVG, UserInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardTopic, CardTopicProps } from '../src';

export default {
  title: 'Components/Cards/Card/Topic',
  component: CardTopic,
} as Meta;

const ICONS = {
  support: <SupportInterfaceSVG />,
  user: <UserInterfaceSVG />,
  rocket: <RocketInterfaceSVG />,
};

const defaultArgs = {
  title: 'Заголовок',
  icon: <SupportInterfaceSVG />,
  onClick: () => {},
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const CardWrapper = styled.div`
  height: 64px;
  width: 220px;
  padding: 20px;
  min-width: 200px;
  resize: horizontal;
  overflow: auto;
`;

const RowCard = styled(CardTopic)`
  width: 250px;
`;

const Template: StoryFn<CardTopicProps> = ({ ...args }) => (
  <>
    Controlled:
    <Wrapper>
      <CardWrapper>
        <CardTopic {...args} />
      </CardWrapper>
    </Wrapper>
    Examples:
    <Wrapper>
      {Object.values(CardTopic.colors).map((color, index) => (
        <RowCard key={`${index}${color}`} {...defaultArgs} color={color} />
      ))}
    </Wrapper>
  </>
);

export const topic = Template.bind({});

topic.args = {
  title: 'Заголовок',
  icon: <SupportInterfaceSVG />,
};

topic.argTypes = {
  icon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'radio',
    },
  },
};

topic.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=632%3A0',
  },
};
