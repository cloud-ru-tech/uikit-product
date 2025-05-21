import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldChat, FieldChatProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Fields Predefined/Field Chat',
  component: FieldChat,
};
export default meta;

type StoryProps = FieldChatProps & {
  showAttachment: boolean;
};

const handleSubmit = (value: string) => window.alert(`Submitted: ${value}`);

const Template = ({ value: valueProp, showAttachment, ...args }: StoryProps) => {
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const [files, setFiles] = useState<File[]>([]);

  const handleDeleteFile = (fileToDelete: File) => {
    setFiles(prev => prev.filter(file => file?.name !== fileToDelete.name));
  };

  return (
    <div className={cn(styles.wrapper, styles.fieldChatWrapper)}>
      <FieldChat
        {...args}
        value={value}
        onChange={setValue}
        handleSubmit={handleSubmit}
        attachment={
          showAttachment
            ? {
                onFilesUpload: setFiles,
                onFileDelete: handleDeleteFile,
                files,
              }
            : undefined
        }
      />
    </div>
  );
};

export const fieldChat: StoryObj<StoryProps> = {
  render: function Render({ ...props }) {
    const [args, setArgs] = useArgs<StoryProps>();

    const onChange = (value: string) => {
      setArgs({ value });
    };

    return <Template {...props} onChange={onChange} value={args.value} />;
  },
  args: {
    showAttachment: true,
  },
  argTypes: {
    showAttachment: {
      name: '[Stories]: Show attachment upload button',
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
