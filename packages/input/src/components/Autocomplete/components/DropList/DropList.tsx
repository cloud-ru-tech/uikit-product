import { MutableRefObject, ReactNode } from 'react';

import { Divider } from '@sbercloud/uikit-product-divider';

import { Content } from './components';
import * as S from './styled';

export type DropListProps = {
  options: { title: string; id: string; subTitle?: string; disabled?: boolean }[];
  value?: string;
  loading?: boolean;
  isOptionsError?: boolean;
  additionalButton?: { text: string; onClick(): void; disabled?: boolean; icon?: ReactNode };
  handleItemSelect: (option: DropListProps['options'][0]) => void;
  droplistRef?: MutableRefObject<HTMLDivElement | null>;
  notFoundText?: string;
};

export function DropList({
  options,
  value: inputValue,
  handleItemSelect,
  loading,
  isOptionsError,
  additionalButton,
  droplistRef,
  notFoundText,
}: DropListProps) {
  return (
    <div ref={droplistRef}>
      <Content
        loading={loading}
        isOptionsError={isOptionsError}
        options={options}
        handleItemSelect={handleItemSelect}
        value={inputValue}
        additionalButton={additionalButton}
        notFoundText={notFoundText}
      />

      {additionalButton && (
        <>
          <S.DividerWrapper>
            <Divider />
          </S.DividerWrapper>

          <S.ListItemWrapper data-disabled={additionalButton.disabled || undefined}>
            <S.AdditionalItem data-disabled={additionalButton.disabled || undefined} onClick={additionalButton.onClick}>
              {additionalButton.icon}
              {additionalButton.text}
            </S.AdditionalItem>
          </S.ListItemWrapper>
        </>
      )}
    </div>
  );
}
