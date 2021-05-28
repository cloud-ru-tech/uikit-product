import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NotifyText } from '../src';

export default {
  title: 'Typography/Notify',
  component: NotifyText,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<{ color: string; children: string }> = ({ children, color, ...restArgs }) => (
  <div style={{ color }}>
    <NotifyText {...restArgs}>{children} (NotifyText)</NotifyText>
  </div>
);

export const notify = Template.bind({});
notify.args = {
  children: 'Пример',
};
notify.argTypes = {
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
notify.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
