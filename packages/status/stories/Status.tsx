import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Status } from '../src';

export default {
  title: 'Not stable/Status',
  component: Status,
} as Meta;

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
`;

const Template: Story = ({ ...args }) => (
  <Wrapper>
    <Status type={Status.types.Failed}>Failed</Status>
    <Status type={Status.types.Success}>Success</Status>
    <Status type={Status.types.Warning}>Warning</Status>
    <Status type={Status.types.Unactive}>Unactive</Status>
    <Status {...args}>Custom Dot Color</Status>
  </Wrapper>
);

export const status = Template.bind(null);
status.args = { dotColor: '#000' };
status.argTypes = {
  dotColor: {
    control: {
      type: 'color',
    },
  },
};
status.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
