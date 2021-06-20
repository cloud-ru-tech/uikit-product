import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ColorPicker } from '../src';

export default {
  title: 'Not stable/Select/Color Picker',
  component: ColorPicker,
} as Meta;

const Template: Story = () => <ColorPicker />;

export const colorPicker = Template.bind({});

colorPicker.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
