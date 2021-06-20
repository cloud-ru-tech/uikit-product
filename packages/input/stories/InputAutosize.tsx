import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { IAutosizeInputProps, InputAutosize } from '../src';

export default {
  title: 'Not stable/Input/Input Autosize',
  component: InputAutosize,
} as Meta;

const Template: Story<IAutosizeInputProps> = () => {
  const [inputValue, setValue] = useState<string>();

  return (
    <InputAutosize
      name='form-field-name'
      value={inputValue}
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
      }}
    />
  );
};

export const inputAutosize = Template.bind({});
inputAutosize.args = {};
inputAutosize.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
