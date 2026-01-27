import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldName, FieldNameProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Fields Predefined/Field Name',
  component: FieldName,
};
export default meta;

type StoryProps = WithLayoutType<FieldNameProps>;

const Template = (props: StoryProps) => <FieldName {...props} />;

export const fieldName: StoryObj<StoryProps> = {
  render: function Render({ ...props }) {
    const [args, setArgs] = useArgs<StoryProps>();

    const onChange = (value: string) => {
      setArgs({ value });
    };

    return (
      <div
        className={cn(styles.wrapper, styles.fieldChatWrapper)}
        style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
      >
        <Template {...props} value={args.value} onChange={onChange} />
      </div>
    );
  },
  args: {
    required: true,
    size: 'm',
    readonly: false,
    validationState: 'default',
    disabled: false,
  },
  argTypes: {
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/hlz1oGYI8T6S1BoX0ywvVZ/Product-UI-Kit?node-id=33828-111&p=f&t=o8necj1f7timfB4k-0',
    },
  },
};
