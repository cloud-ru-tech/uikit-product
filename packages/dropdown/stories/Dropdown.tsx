import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useCallback, useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import { Button, ButtonIcon, ButtonRound } from '@sbercloud/uikit-react-button';
import { Divider } from '@sbercloud/uikit-react-divider';
import {
  ChevronLeftInterfaceSVG,
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

const IconWrapper = styled.div`
  margin-left: 8px;

  svg {
    transform: rotate(-90deg);
    transition: all 0.2s ease-in-out;
  }

  &[data-rotate='true'] {
    svg {
      transform: rotate(90deg);
    }
  }
`;

const Template: Story<DropdownMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = useCallback((value: boolean) => setIsOpen(value), []);

  return (
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

      <DropdownMenu
        actions={[
          { name: 'Загрузить файл', onClick: () => {} },
          { name: 'Загрузить документ', onClick: () => {} },
        ]}
        onToggle={onToggle}
      >
        <Button
          text='Button text'
          icon={
            <IconWrapper data-rotate={isOpen}>
              <ChevronLeftInterfaceSVG size={20} />
            </IconWrapper>
          }
        />
      </DropdownMenu>
    </Wrapper>
  );
};

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
