import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TableText } from '../src';

export default {
  title: 'Typography/Table',
  component: TableText,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<{ color: string; children: string }> = ({ children, color, ...restArgs }) => (
  <div style={{ color }}>
    <TableText {...restArgs}>{children} (TableText)</TableText>
  </div>
);

export const table = Template.bind({});
table.args = {
  children: 'Пример',
};
table.argTypes = {
  color: {
    control: {
      type: 'color',
    },
  },
  children: {
    control: {
      type: 'text',
    },
  },
};
table.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
