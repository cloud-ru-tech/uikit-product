import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { TextField } from '@sbercloud/uikit-product-text-field';
import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InfoRow, InfoRowProps, LabelInfo } from '../src';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  background-color: var(${EXPORT_VARS.GREY[0]});
  padding: 24px;
  border-radius: 16px;
`;

export default {
  title: 'Not stable/Layout/BlockInfo/InfoRow',
  component: InfoRow,
} as Meta;

const DEFAULT_ARGS = {
  label: <LabelInfo label='Название' tooltip={{ content: 'Название' }} />,
  value: 'Здесь может быть любой компонент с информацией',
  topDivider: true,
  bottomDivider: true,
};

const LARGE_LABEL_ARGS = {
  ...DEFAULT_ARGS,
  label: <LabelInfo label='Текстовое поле' size={LabelInfo.sizes.Large} tooltip={{ content: 'Текстовое поле' }} />,
  value: <TextField text='Text' size={TextField.sizes.Large} allowCopy />,
};

const Template: StoryFn<InfoRowProps> = ({ ...args }) => (
  <Container>
    <div>
      LabelInfo размер L, используется в сочетании с Text field Many liens, Text field One line размера L, Input размера
      L, компонентом Document
    </div>
    <InfoRow {...LARGE_LABEL_ARGS} />
    <div>LabelInfo размер S, с обычным текстом</div>
    <InfoRow {...args} />
  </Container>
);

export const infoRow = Template.bind({});

infoRow.args = DEFAULT_ARGS;

infoRow.argTypes = {};

infoRow.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/cdtItYHTIEGB0wMZPAp729/%5BLIB%5D-Platform-DS-%E2%88%99-Sandbox?type=design&node-id=1326-174807&t=eN8anAcYgN7ZSBEQ-0',
  },
};
