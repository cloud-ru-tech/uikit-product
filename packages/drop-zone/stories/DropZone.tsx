import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DropZone, DropZoneProps } from '../src';

export default {
  title: 'Not stable/Drop Zone',
  component: DropZone,
} as Meta;

const Container = styled.div<{ theme: Themes }>`
  width: calc(100% - 80px);
  height: 400px;
  padding: 40px;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 20px;
  background-color: ${({ theme }) => (['purple', 'green'].includes(theme) ? '#ffffff' : '#333333')};
`;

const Template: Story<DropZoneProps> = ({ ...args }, { globals: { theme } }) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div>
      <Container theme={theme}>
        <DropZone
          {...args}
          onFileSelected={(files: File[]) => {
            setFiles(files);
          }}
        />
      </Container>
      <pre>
        {JSON.stringify(
          files.map(({ lastModified, name, size, type }) => ({
            name,
            type,
            size,
            lastModified,
          })),
          null,
          2,
        )}
      </pre>
    </div>
  );
};

export const dropZone = Template.bind({});
dropZone.args = {
  content: 'Фото, видео и документы до 30 МБ',
};
dropZone.argTypes = {};
dropZone.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.BETA],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=4238%3A66023',
  },
};
