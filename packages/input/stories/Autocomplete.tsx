import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { EditInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Autocomplete, AutocompleteProps } from '../src';

const config: Meta = {
  title: 'Components/Input/Autocomplete',
  component: Autocomplete,
};

export default config;

const Template = (args: AutocompleteProps) => {
  const [value, setValue] = useState<string>();

  return <Autocomplete {...args} value={value} onChange={setValue} onSelect={({ title }) => setValue(title)} />;
};

export const autocomplete: StoryFn<AutocompleteProps> = Template.bind({});
autocomplete.args = {
  label: 'Label',
  labelTooltip: { content: 'Label tooltip content' },
  hint: 'Hint',
  placeholder: 'Placeholder',
  disabled: false,
  additionalButton: { text: 'Click me', onClick: () => {}, disabled: false, icon: <EditInterfaceSVG /> },
  options: [
    {
      title:
        'long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long ',
      id: '1',
    },
    { title: '2', id: '2', disabled: true },
    { title: 'title', id: '3', subTitle: 'subTitle' },
    {
      title: '4',
      id: '4',
      subTitle:
        'First name, Last name, Address loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong',
    },
    { title: '5', id: '5' },
    { title: '6', id: '6' },
    { title: '7', id: '7' },
    { title: '8', id: '8' },
    { title: '9', id: '9' },
    { title: '10', id: '10' },
    { title: '11', id: '11' },
    { title: '12', id: '12' },
  ],
};
autocomplete.argTypes = {};
autocomplete.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=1106%3A23348',
  },
};
