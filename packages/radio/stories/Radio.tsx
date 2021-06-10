import { styled } from '@linaria/react';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { IRadioProps, Radio } from '../src';

const { COLORS_DRAWER } = EXPORT_VARS;

export default {
  title: 'Not stable/Radio',
  component: Radio,
  decorators: [addReadme, withDesign],
} as Meta;

const Wrapper = styled.div`
  background-color: var(${COLORS_DRAWER.BACKGROUND});
  padding: 10px;
`;

const Template: Story<IRadioProps> = ({ ...args }) => (
  <Wrapper>
    <Radio {...args} />
  </Wrapper>
);

export const radio = Template.bind({});
radio.args = {
  value: 'story1',
  label: 'story1',
};
radio.parameters = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
