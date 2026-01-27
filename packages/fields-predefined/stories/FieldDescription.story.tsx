import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldDescription, FieldDescriptionProps } from '../src/components';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Fields Predefined/Field Description',
  component: FieldDescription,
};
export default meta;

type StoryProps = WithLayoutType<FieldDescriptionProps>;

const Template = (props: StoryProps) => (
  <div className={cn(styles.wrapper, styles.fieldChatWrapper)}>
    <FieldDescription {...props} />
  </div>
);

export const fieldDescription: StoryObj<StoryProps> = {
  render: function Render({ ...props }) {
    const [args, setArgs] = useArgs<StoryProps>();

    const onChange = (value: string) => {
      setArgs({ value });
    };

    return <Template {...props} onChange={onChange} value={args.value} />;
  },
  args: {
    required: false,
    size: 'm',
    readonly: false,
    validationState: 'default',
    disabled: false,
    addButton: false,
  },
  argTypes: {
    required: {
      name: '[Story]: Required',
      control: 'boolean',
    },
    addButton: {
      name: '[Story]: With add Button',
      control: 'boolean',
      if: { arg: 'required', eq: false },
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/N0k6b5UE2NAs86fGmfmFy1/Product-UI-Kit?node-id=31921-21498&p=f&t=xI1nhA5WNEETxx13-0',
    },
  },
};
