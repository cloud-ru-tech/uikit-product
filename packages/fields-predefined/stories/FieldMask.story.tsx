import { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldMask, FieldMaskProps, MASK } from '../src';

const meta: Meta = {
  title: 'Console/Fields Predefined/Field Mask',
  component: FieldMask,
};
export default meta;

export const fieldMask: StoryObj<FieldMaskProps> = {
  render: function Render({ ...args }) {
    const [valueProp, setValueProp] = useState<string>('');
    const [unmaskedValue, setUnmaskedValue] = useState<string>('');

    const ref = useRef<HTMLInputElement>(null);

    return (
      <>
        <FieldMask
          {...args}
          ref={ref}
          value={valueProp}
          onChange={(value, mask) => {
            setValueProp(value);
            setUnmaskedValue(mask.unmaskedValue);
          }}
        />

        <div>valueProp: {valueProp}</div>
        <div>unmaskedValue: {unmaskedValue}</div>
      </>
    );
  },
  args: {
    mask: MASK.Uuid,
    label: 'Label',
    name: 'name',
    hint: 'hint',
    size: 'm',
  },
  argTypes: {
    mask: {
      options: Object.values(MASK),
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      //TODO: update to the correct one
      url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
    },
  },
};
