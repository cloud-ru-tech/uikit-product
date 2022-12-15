import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TruncateString, TruncateStringProps } from '../src';

export default {
  title: 'Not stable/Truncate String',
  component: TruncateString,
} as Meta;

const Column = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  resize: horizontal;
  overflow: auto;
`;

const Template: Story<TruncateStringProps & { columnWidth?: number }> = ({ ...args }) => (
  <Column>
    <TruncateString {...args} />
  </Column>
);

export const truncateString = Template.bind({});
truncateString.args = {
  maxLines: 2,
  text: 'какой-то длинный текст который обрезается на самом интересном',
  textEntity: TruncateString.textEntities.Text2,
  placement: TruncateString.placements.Auto,
  hideTooltip: false,
  variant: TruncateString.variants.End,
};
truncateString.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
truncateString.argTypes = {};
