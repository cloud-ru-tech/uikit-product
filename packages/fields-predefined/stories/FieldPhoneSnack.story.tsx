import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldPhone, FieldPhoneOptionsProps, FieldPhoneProps, usePredefinedPhoneMasks } from '../src/components';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Fields Predefined/Field Phone',
  component: FieldPhone,
};
export default meta;

type StoryProps = FieldPhoneProps & {
  onlyOneMask?: boolean;
};

const Template = ({ size, value, onlyOneMask, ...args }: StoryProps) => {
  const [, setCountry] = useState<FieldPhoneOptionsProps>();

  const masks = usePredefinedPhoneMasks();

  return (
    <div className={styles.wrapper} data-size={size || 's'}>
      <FieldPhone
        {...args}
        options={onlyOneMask ? [masks[0]] : masks}
        value={value}
        size={size}
        onChangeCountry={setCountry}
      />
    </div>
  );
};

export const fieldPhone: StoryObj<StoryProps> = {
  render: function Render({ ...props }) {
    const [args, setArgs] = useArgs<StoryProps>();

    const onChange = (value: string) => {
      setArgs({ value });
    };

    return <Template {...props} onChange={onChange} value={args.value} />;
  },
  args: {
    id: 'newSelect',
    label: 'Label text',
    labelTooltip: 'Tooltip description',
    searchPlaceholder: 'Placeholder',
    required: false,
    hint: 'Hint text',
    size: 's',
    readonly: false,
    validationState: 'default',
    value: '+79003332211',
    disabled: false,
    showCopyButton: true,
    showClearButton: true,
    onlyOneMask: false,
    scrollList: false,
  },
  argTypes: {
    labelTooltip: {
      type: 'string',
    },
    onlyOneMask: {
      name: '[Stories] use only first mask',
      type: 'boolean',
    },
    value: {
      type: 'string',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1',
    },
  },
};
