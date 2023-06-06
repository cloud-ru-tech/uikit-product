import React, { useRef, useState } from 'react';
import RCSelect, { ValueType } from 'react-select';

import { Modal } from '@sbercloud/uikit-product-modal';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { Colors } from '../../constants';
import * as TagComponents from '../../helperComponents/TagSelect';
import { checkMobileDevice } from '../../helpers/checkMobileDevice';
import { getSelectStyles } from '../../helpers/getSelectStyles';
import { DictionaryPropertyAsFn, textProvider, Texts } from '../../helpers/texts-provider';

export type OptionTypeTag = {
  value: string;
  label: string;
  color: Colors;
};

type RCProps = React.ComponentProps<typeof RCSelect>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ITagSelect extends Omit<RCProps, 'components'> {
  defaultValue?: OptionTypeTag;
  value?: OptionTypeTag;
  options?: OptionTypeTag[];
  isHover?: boolean;
  customControl?: (props: { toggleMenu: (isMenuOpen?: boolean) => void; menuIsOpen?: boolean }) => JSX.Element;
  onTagChange?: (
    tags: OptionTypeTag[],
    index: number,
    tag: OptionTypeTag,
    operation: 'add' | 'delete' | 'edit',
  ) => void;
  isSelected?: boolean;
  dropdownPlacement?: 'left' | 'right';
  colorDropdownPlacement?: 'left' | 'right';
  validator?: (tagName: string) => boolean;
  validateMessage?: string;
}

type ApproveDeleteType = { tag: OptionTypeTag; callbackDelete: () => void };

/* todo: слишком сложно, надо упрощать */
export function TagSelect(props: ITagSelect): JSX.Element {
  const {
    isHover,
    onTagChange,
    options,
    onChange,
    value,
    isSelected = true,
    dropdownPlacement = 'left',
    colorDropdownPlacement = 'left',
    validator,
    validateMessage,
  } = props;
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const containerRef = useRef<HTMLDivElement>();
  const [inputValue, setInputSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [menuListBlockScroll, setMenuListBlockScroll] = useState(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  const [currentTag, setCurrentTag] = useState<ValueType<OptionTypeTag>>(value);
  const [customStyles] = useState(getSelectStyles('tag'));

  const [approveDelete, setApproveDelete] = useState<ApproveDeleteType | null>(null);

  const toggleMenu = (isMenuOpen?: boolean): void => {
    if (typeof isMenuOpen === 'boolean') {
      setIsOpen(isMenuOpen);
    } else {
      setIsOpen(!isOpen);
    }

    if (isMenuOpen === false || isOpen) {
      setMenuListBlockScroll(false);
    }
  };

  return (
    <>
      <RCSelect<OptionTypeTag>
        {...props}
        menuIsOpen={checkMobileDevice() ? undefined : isOpen}
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
        approveDeleting={(tag: OptionTypeTag, callbackDelete: () => void): void => {
          setApproveDelete({ tag, callbackDelete });
        }}
        validator={validator}
        validateMessage={validateMessage}
      />

      <Modal
        isOpen={Boolean(approveDelete?.tag)}
        onClose={() => {
          setApproveDelete(null);
        }}
        title={textProvider<string>(languageCode, Texts.ModalDeleteTagTitle)}
        content={textProvider<DictionaryPropertyAsFn>(
          languageCode,
          Texts.ModalDeleteTagDesc,
        )({ label: approveDelete?.tag?.label || '' })}
        approveButton={{
          onClick() {
            approveDelete?.callbackDelete();
            setApproveDelete(null);
          },
          alarm: true,
        }}
        cancelButton={{
          onClick() {
            setApproveDelete(null);
          },
        }}
      />
    </>
  );
}
