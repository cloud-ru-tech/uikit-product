import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ITruncateStringProps, TruncateString } from '../src';

export default {
  title: 'Not stable/Truncate String',
  component: TruncateString,
} as Meta;

const Column = styled.div<{ width: number }>`
  display: flex;
  width: ${({ width }) => width}px;
  flex-direction: column;
`;

const Template: Story<ITruncateStringProps & { columnWidth?: number }> = ({ ...args }) => (
  <Column width={args?.columnWidth || 200}>
    <TruncateString {...args} />
  </Column>
);

export const truncateString = Template.bind({});
truncateString.args = {
  columnWidth: 200,
  text: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-qgoiku6b',
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
