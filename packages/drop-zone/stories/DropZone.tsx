import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DropZone, DropZoneProps } from '../src';

export default {
  title: 'Not stable/DropZone',
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

const Template: Story<DropZoneProps> = ({ ...args }, { globals: { theme } }) => (
  <div>
    <Container theme={theme}>
      <DropZone {...args} />
    </Container>
  </div>
);

export const dropZone = Template.bind({});
dropZone.args = {
  onFileSelected: (files: File[]) => {
    // eslint-disable-next-line no-console
    console.log(files);
  },
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
    //TODO
  },
};
