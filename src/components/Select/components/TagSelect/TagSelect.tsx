import { useState, useRef } from 'react';
import RCSelect from 'react-select';

import { Modal } from 'components/Modal';
import { PresetColorType } from 'components/Tag/helpers/colors';
import * as TagComponents from 'components/Select/helperComponents/TagSelect';

import getSelectorStyles from 'components/Select/helpers/getSelectStyles';

export type OptionTypeTag = {
  value: string;
  label: string;
  color: PresetColorType;
};

type RCProps = React.ComponentProps<typeof RCSelect>;

export interface ITagSelect extends Omit<RCProps, 'components'> {
  defaultValue?: OptionTypeTag;
  value?: OptionTypeTag;
  options?: OptionTypeTag[];
  isHover?: boolean;
  customControl?: (props: {
    toggleMenu: (isMenuOpen?: boolean) => void;
    menuIsOpen?: boolean;
  }) => JSX.Element;
  onTagChange?: (
    tags: OptionTypeTag[],
    index: number,
    tag: OptionTypeTag,
    operation: 'add' | 'delete' | 'edit',
  ) => void;
  isSelected?: boolean;
  dropdownPlacement?: 'left' | 'right';
  colorDropdownPlacement?: 'left' | 'right';
}

type ApproveDeleteType = { tag: OptionTypeTag; callbackDelete: () => void };

/* todo: слишком сложно, надо упрощать */
export const TagSelect = (props: ITagSelect): JSX.Element => {
  const {
    isHover,
    onTagChange,
    options,
    onChange,
    value,
    isSelected = true,
    dropdownPlacement = 'left',
    colorDropdownPlacement = 'left',
  } = props;
  const containerRef = useRef<HTMLDivElement>();
  const [inputValue, setInputSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [menuListBlockScroll, setMenuListBlockScroll] = useState(false);
  const [currentTag, setCurrentTag] = useState(value);
  const [customStyles] = useState(getSelectorStyles('tag'));

  const [modalInstance, setModalInstance] = useState<HTMLDivElement | null>(
    null,
  );
  const [approveDelete, setApproveDelete] = useState<ApproveDeleteType | null>(
    null,
  );

  const toggleMenu = (isMenuOpen?: boolean): void => {
    if (typeof isMenuOpen === 'boolean') {
      setIsOpen(isMenuOpen);
    } else {
      setIsOpen(!isOpen);
    }

    if (isMenuOpen === false || !isOpen === false) {
      setMenuListBlockScroll(false);
    }
  };

  return (
    <>
      <RCSelect<OptionTypeTag>
        {...props}
        menuIsOpen={isOpen}
        value={currentTag}
        options={options}
        components={TagComponents}
        isSelected={isSelected}
        dropdownPlacement={dropdownPlacement}
        colorDropdownPlacement={colorDropdownPlacement}
        isSearchable={false}
        inputValue={inputValue}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        styles={customStyles.styles}
        theme={customStyles.theme}
        backspaceRemovesValue={false}
        onTagChange={onTagChange}
        onChange={(tag): void => {
          setCurrentTag(tag || undefined);
          if (onChange) onChange(tag);
        }}
        toggleMenu={toggleMenu}
        menuListBlockScroll={menuListBlockScroll}
        setMenuListBlockScroll={setMenuListBlockScroll}
        onSearch={setInputSearch}
        placeholder=''
        containerRef={containerRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>): void => {
          /* todo: fix this `dirty` hack */
          e.defaultPrevented = true;
        }}
        isHover={isHover}
        approveDeleting={(
          tag: OptionTypeTag,
          callbackDelete: () => void,
        ): void => {
          setApproveDelete({ tag, callbackDelete });
        }}
        modalInstance={modalInstance}
      />
      <Modal
        isOpen={Boolean(approveDelete?.tag)}
        onRequestClose={(): void => {
          setApproveDelete(null);
        }}
        appElement={document.body}
        title='Удаление тега'
        description={`Вы действительно хотите удалить тег «${approveDelete?.tag?.label}»?`}
        approve={(): void => {
          approveDelete?.callbackDelete();
        }}
        cancel={(): void => {
          setApproveDelete(null);
        }}
        overlayRef={(instance: HTMLDivElement): void => {
          setModalInstance(instance);
        }}
      />
    </>
  );
};
