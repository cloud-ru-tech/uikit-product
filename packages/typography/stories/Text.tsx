import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Text1, Text2, Text2Link, Text3, Text4 } from '../src';

export default {
  title: 'Typography/Text',
  component: Text1,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<{ color: string; children: string }> = ({ children, color, ...restArgs }) => (
  <div style={{ color, display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Text1 {...restArgs}>{children} (Text1)</Text1>
    <Text2 {...restArgs}>{children} (Text2)</Text2>
    <Text2Link {...restArgs} href='https://sbercloud.ru' target='_blank'>
      {children} (Text2Link)
    </Text2Link>
    <Text3 {...restArgs}>{children} (Text3)</Text3>
    <Text4 {...restArgs}>{children} (Text4)</Text4>
  </div>
);

export const text = Template.bind({});
text.args = {
  children: 'Пример',
};
text.argTypes = {
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
text.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
