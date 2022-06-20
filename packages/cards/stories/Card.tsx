import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { H4_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Card, CardProps } from '../src';

export default {
  title: 'Not stable/Card/Card',
  component: Card,
} as Meta;

const Title = styled.h4`
  ${H4_STYLES};
`;

const Paragraph = styled.span`
  ${TEXT_2_STYLES};
`;

const handleClick = (e: React.MouseEvent<HTMLElement>) => {
  e.stopPropagation();
  alert('Card alert');
};

const Template: Story<CardProps> = ({ ...args }) => (
  <Card {...args} onClick={handleClick}>
    <Title>Вступить группу</Title>
    <Paragraph>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nihil magni mollitia repellat quaerat inventore
      officia saepe similique temporibus corporis.
    </Paragraph>
  </Card>
);

export const card = Template.bind({});
card.args = {};
card.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.BETA],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=632%3A0',
  },
};
