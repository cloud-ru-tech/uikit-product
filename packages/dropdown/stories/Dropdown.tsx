import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import { ButtonIcon, ButtonRound } from '@sbercloud/uikit-react-button';
import { Divider } from '@sbercloud/uikit-react-divider';
import {
  CircleAddInterfaceSVG,
  FileUploadFilledInterfaceSVG,
  FolderUploadFilledInterfaceSVG,
  SettingsInterfaceSVG,
} from '@sbercloud/uikit-react-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DropdownItem, DropdownMenu, DropdownMenuProps } from '../src';

export default {
  title: 'Not stable/Dropdown',
  component: DropdownMenu,
  decorators: [addReadme, withDesign],
} as Meta;

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  grid-gap: 16px;
`;

const Template: Story<DropdownMenuProps> = () => (
  <Wrapper>
    <DropdownMenu
      actions={
        <>
          <DropdownItem onClick={(): void => {}}>
            <FileUploadFilledInterfaceSVG />
            Загрузить файл
          </DropdownItem>
          <Divider />
          <DropdownItem onClick={(): void => {}}>
            <FolderUploadFilledInterfaceSVG />
            Загрузить документ
          </DropdownItem>
          <DropdownItem onClick={(): void => {}}>
            <FileUploadFilledInterfaceSVG />
            Загрузить файл
          </DropdownItem>
        </>
      }
    >
      <ButtonRound icon={<CircleAddInterfaceSVG />} text='Создать' />
    </DropdownMenu>

    <DropdownMenu
      actions={[
        { name: 'Загрузить файл', onClick: () => {} },
        { name: 'Загрузить документ', onClick: () => {} },
      ]}
    >
      <ButtonIcon icon={<SettingsInterfaceSVG />} tooltip={{ content: 'Настройки' }} />
    </DropdownMenu>
  </Wrapper>
);

export const dropdown = Template.bind({});
dropdown.args = {};
dropdown.argTypes = {};
dropdown.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-Design_System?node-id=1714%3A2404',
  },
};
