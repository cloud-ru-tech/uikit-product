import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect, useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Checkbox, CheckboxProps } from '../src';

export default {
  title: 'Components/Checkbox/Checkbox',
  component: Checkbox,
} as Meta;

const CheckboxWrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Template: Story<CheckboxProps> = ({ checked, ...args }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <CheckboxWrap>
      <Checkbox {...args} checked={isChecked} handleChange={isChecked => setIsChecked(isChecked)} />
    </CheckboxWrap>
  );
};

export const checkbox = Template.bind({});
checkbox.args = {
  checked: false,
  partChecked: false,
  disabled: false,
  label: '',
};
checkbox.argTypes = {
  label: {
    control: 'text',
  },
};
checkbox.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3223%3A46057',
  },
};
