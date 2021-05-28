import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CopyInput, CopyInputProps } from '../src';

export default {
  title: 'Components/Input/Copy Input',
  component: CopyInput,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<CopyInputProps> = ({ ...args }) => <CopyInput {...args} />;

export const copyInput = Template.bind({});
copyInput.args = {};
copyInput.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
copyInput.argTypes = {
  value: {
    defaultValue: 'Пример: Project1-bucket106',
  },
};
