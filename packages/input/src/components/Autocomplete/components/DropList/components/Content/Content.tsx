import { ReactNode, useContext } from 'react';

import { Scroll } from '@sbercloud/uikit-product-scroll';
import { Spinner } from '@sbercloud/uikit-product-spinner';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import { FloatingContext } from '../../../../contexts';
import * as S from './styled';

export type DropListProps = {
  options: { title: string; id: string; subTitle?: string; disabled?: boolean }[];
  value?: string;
  loading?: boolean;
  isOptionsError?: boolean;
  additionalButton?: { text: string; onClick(): void; disabled?: boolean; icon?: ReactNode };
  handleItemSelect: (option: DropListProps['options'][0]) => void;
};

export function Content({
  options,
  value: inputValue,
  handleItemSelect,
  loading,
  isOptionsError,
  additionalButton,
}: DropListProps) {
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
    <Scroll
      variant={Scroll.variants.Primary}
      size={Scroll.sizes.Small}
      className={additionalButton ? S.scrollShrinkedClassName : S.scrollClassName}
    >
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
              <TruncateString text={title} maxLines={1} className={S.titleClassName} />

              {subTitle && <TruncateString text={subTitle} maxLines={1} className={S.subtitleClassName} />}
            </S.ListItem>
          </S.ListItemWrapper>
        );
      })}
    </Scroll>
  );
}
