import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Text1, Text2, Text2Link, Text3, Text4 } from '../src';

export default {
  title: 'Typography/Text',
  component: Text1,
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
    url: 'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-Design_System?node-id=2%3A2540',
  },
};
