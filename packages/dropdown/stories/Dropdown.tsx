import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useCallback, useState } from 'react';

import { Button, ButtonIcon, ButtonRound } from '@sbercloud/uikit-product-button';
import { Checkbox } from '@sbercloud/uikit-product-checkbox';
import { Divider } from '@sbercloud/uikit-product-divider';
import {
  ChevronLeftInterfaceSVG,
  CircleAddInterfaceSVG,
  FileUploadFilledInterfaceSVG,
  FolderUploadFilledInterfaceSVG,
  SettingsInterfaceSVG,
} from '@sbercloud/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DropdownItem, DropdownMenu, DropdownMenuProps } from '../src';

export default {
  title: 'Not stable/Dropdown',
  component: DropdownMenu,
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

const Template: Story<DropdownMenuProps> = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState({
    filesButton: false,
    filterButton: false,
  });
  const onToggle = useCallback(
    (buttonName: string, value: boolean) => setIsOpen(state => ({ ...state, [buttonName]: value })),
    [],
  );

  const [value, setValue] = useState<string | undefined>(undefined);
  const [checkboxes, setCheckboxes] = useState({});

  const handleCheckCheckbox = (label: string, checked: boolean) => {
    setCheckboxes(state => ({
      ...state,
      [label]: checked,
    }));
  };

  return (
    <Wrapper>
      <DropdownMenu
        data-test-id={args['data-test-id']}
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
        data-test-id={args['data-test-id']}
        actions={[
          { label: 'Загрузить файл', value: '1' },
          { label: 'Загрузить документ', value: '2' },
        ]}
        value={value}
        onChange={setValue}
      >
        <ButtonIcon icon={<SettingsInterfaceSVG />} tooltip={{ content: 'Настройки' }} />
      </DropdownMenu>

      <DropdownMenu
        data-test-id={args['data-test-id']}
        actions={[
          { value: '1', label: 'Загрузить файл', onClick: () => {} },
          { value: '2', label: 'Загрузить документ', onClick: () => {}, disabled: true },
          { value: '3', label: 'Загрузить файл', onClick: () => {} },
          { value: '4', label: 'Загрузить документ', onClick: () => {} },
          { value: '5', label: 'Загрузить файл', onClick: () => {} },
          { value: '6', label: 'Загрузить документ', onClick: () => {} },
          { value: '7', label: 'Загрузить файл', onClick: () => {} },
          { value: '8', label: 'Загрузить документ', onClick: () => {} },
          { value: '9', label: 'Загрузить файл', onClick: () => {} },
          { value: '10', label: 'Загрузить документ', onClick: () => {} },
          { value: '11', label: 'Загрузить файл', onClick: () => {} },
          { value: '12', label: 'Загрузить документ', onClick: () => {} },
          { value: '13', label: 'Загрузить файл', onClick: () => {} },
          { value: '14', label: 'Загрузить документ', onClick: () => {} },
          { value: '15', label: 'Загрузить файл', onClick: () => {} },
          { value: '16', label: 'Загрузить документ', onClick: () => {} },
          { value: '17', label: 'Загрузить файл', onClick: () => {} },
          { value: '18', label: 'Загрузить документ', onClick: () => {} },
          { value: '19', label: 'Загрузить файл', onClick: () => {} },
          { value: '20', label: 'Загрузить документ', onClick: () => {} },
        ]}
        onToggle={value => onToggle('filesButton', value)}
      >
        <Button
          text='Button text'
          icon={
            <IconWrapper data-rotate={isOpen['filesButton']}>
              <ChevronLeftInterfaceSVG size={20} />
            </IconWrapper>
          }
        />
      </DropdownMenu>

      <DropdownMenu
        closeOnMenuClick={false}
        data-test-id={args['data-test-id']}
        actions={
          <>
            {['Пункт 1', 'Пункт 2', 'Пункт 3'].map(item => (
              <DropdownItem key={item}>
                <Checkbox
                  label={item}
                  checked={checkboxes[item]}
                  handleChange={checked => handleCheckCheckbox(item, checked)}
                />
              </DropdownItem>
            ))}
          </>
        }
        onToggle={value => onToggle('filterButton', value)}
      >
        <Button
          icon={
            <IconWrapper data-rotate={isOpen['filterButton']}>
              <ChevronLeftInterfaceSVG size={20} />
            </IconWrapper>
          }
          text='Фильтр'
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
