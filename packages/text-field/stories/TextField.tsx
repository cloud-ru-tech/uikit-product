import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { ButtonIconTransparent, RefreshButton } from '@sbercloud/uikit-react-button';
import { InfoInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { EXPORT_VARS, GLOBAL_CSS_COLOR } from '@sbercloud/uikit-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TextField, TextFieldProps } from '../src';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  margin: 20px;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 10px;
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
`;

export default {
  title: 'Components/Text Field',
  component: TextField,
} as Meta;

const Template: Story<TextFieldProps> = ({ ...args }) => (
  <Container>
    <TextField {...args} />
  </Container>
);

export const textField = Template.bind({});
textField.args = {
  text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.\nLorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
  extraIcons: (
    <>
      <ButtonIconTransparent icon={<InfoInterfaceSVG />} tooltip={{ content: 'Инфо' }} />
      <RefreshButton />
    </>
  ),
  'data-test-id': 'testId',
};
textField.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=2860%3A41940',
  },
  badges: [BADGE.STABLE],
};
