import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { MouseEvent, useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldAi, FieldAiProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Fields Predefined/Field AI',
  component: FieldAi,
};
export default meta;

type StoryProps = FieldAiProps & {
  showResetContextButton?: boolean;
};

const handleSubmit = (value: string) => window.alert(`Submitted: ${value}`);
const handleSupportUrlClick = (e: MouseEvent) => {
  e.preventDefault();
  window.alert(`Support URL clicked!`);
};
const handleResetContextClick = () => window.alert('Context has been reset successfully!');

const Template = ({ value: valueProp, showResetContextButton, ...args }: StoryProps) => {
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <div className={cn(styles.wrapper, styles.fieldAiWrapper)}>
      <FieldAi
        {...args}
        value={value}
        onChange={setValue}
        handleSubmit={handleSubmit}
        handleSupportUrlClick={handleSupportUrlClick}
        handleResetContextClick={showResetContextButton ? handleResetContextClick : undefined}
      />
    </div>
  );
};

export const fieldAI: StoryObj<StoryProps> = {
  render: function Render({ ...props }) {
    const [args, setArgs] = useArgs<StoryProps>();

    const onChange = (value: string) => {
      setArgs({ value });
    };

    return <Template {...props} onChange={onChange} value={args.value} />;
  },
  args: {
    supportUrl: 'https://cloud.ru',
    showResetContextButton: false,
  },
  argTypes: {
    showResetContextButton: {
      name: '[Stories]: Enable reset context button',
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/a6IwGVpPwPCE1xQ3Vdq0fk/Product-UI-Kit?node-id=32386-22197&m=dev',
    },
  },
};
