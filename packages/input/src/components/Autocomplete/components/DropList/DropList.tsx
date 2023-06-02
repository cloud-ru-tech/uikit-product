import { MutableRefObject, useContext } from 'react';

import { Spinner } from '@sbercloud/uikit-product-spinner';

import { FloatingContext } from '../../contexts';
import * as S from './styled';

export type DropListProps = {
  options: { title: string; id: string; subTitle?: string; disabled?: boolean }[];
  value?: string;
  loading?: boolean;
  isOptionsError?: boolean;

  handleItemSelect: (option: DropListProps['options'][0]) => void;
  droplistRef?: MutableRefObject<HTMLDivElement | null>;
};

export const DropList = ({
  options,
  value: inputValue,
  handleItemSelect,
  loading,
  isOptionsError,
  droplistRef,
}: DropListProps) => {
  const { setIsOpen } = useContext(FloatingContext);

  if (loading) {
    return (
      <S.LoadingBox>
        <Spinner size={Spinner.sizes.Small} />
      </S.LoadingBox>
    );
  }

  if (isOptionsError) {
    return (
      <S.ErrorBox>
        <S.CircleCancelFilledInterfaceSVGStyled />
        <S.Text2Red>Нет данных</S.Text2Red>
      </S.ErrorBox>
    );
  }

  if (!options.length) {
    return (
      <S.ErrorBox>
        <S.SearchInterfaceSVGStyled />
        <S.Text2Grey>Совпадений не найдено</S.Text2Grey>
      </S.ErrorBox>
    );
  }

  return (
    <div ref={droplistRef}>
      {options.map(option => {
        const { subTitle, title, id, disabled } = option;

        return (
          <S.ListItemWrapper key={id} data-disabled={disabled || undefined}>
            <S.ListItem
              data-disabled={disabled || undefined}
              data-selected={title === inputValue || undefined}
              onClick={() => {
                if (!disabled) {
                  handleItemSelect(option);
                  setIsOpen(false);
                }
              }}
            >
              <S.Text2>{title}</S.Text2>
              <S.Text3Grey>{subTitle}</S.Text3Grey>
            </S.ListItem>
          </S.ListItemWrapper>
        );
      })}
    </div>
  );
};
