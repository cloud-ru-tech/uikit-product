import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Checkbox, CheckboxProps } from '../src';

const meta: Meta = {
  title: 'Components/Checkbox/Checkbox',
  component: Checkbox,
};
export default meta;

const CheckboxWrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type State =
  | { type: 'unchecked' }
  | { type: 'partChecked' }
  | {
      type: 'checked';
    };

function Template({ checked, partChecked, ...args }: CheckboxProps) {
  const [checkedState, setCheckedState] = useState<State>({ type: 'unchecked' });

  useEffect(() => {
    if (partChecked) {
      setCheckedState({ type: 'partChecked' });
      return;
    }

    if (checked) {
      setCheckedState({ type: 'checked' });
      return;
    }

    setCheckedState({ type: 'unchecked' });
  }, [checked, partChecked]);

  return (
    <CheckboxWrap>
      <Checkbox
        {...args}
        checked={checkedState.type === 'checked'}
        partChecked={checkedState.type === 'partChecked'}
        handleChange={isChecked => {
          if (isChecked) {
            setCheckedState({ type: 'checked' });
            return;
          }

          setCheckedState({ type: 'unchecked' });
        }}
      />
    </CheckboxWrap>
  );
}

export const checkbox: StoryFn<CheckboxProps> = Template.bind({});
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
