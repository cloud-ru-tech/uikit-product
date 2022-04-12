import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Marker, MarkerProps } from '../src';

const MarkerWrap = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default {
  title: 'Not stable/Marker',
  component: Marker,
} as Meta;

const Template: Story<MarkerProps> = ({ ...args }) => (
  <MarkerWrap>
    <Marker variant={Marker.variants.Green} text={'Новое'} />
    <Marker variant={Marker.variants.Blue} text={'Рекомендуемое'} />
    <Marker variant={Marker.variants.Red} text={'Топ'} />
    <Marker {...args} />
  </MarkerWrap>
);

export const marker = Template.bind({});
marker.args = {
  text: 'Controls',
  variant: Marker.variants.Red,
};
marker.argTypes = {};
marker.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0?node-id=5021%3A67033',
  },
  badges: [BADGE.STABLE],
};
