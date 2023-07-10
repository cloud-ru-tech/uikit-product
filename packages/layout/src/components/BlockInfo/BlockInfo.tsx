import { ReactNode } from 'react';

import { Button } from '@sbercloud/uikit-product-button';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { InfoRow } from '../InfoRow';
import * as S from './styled';

export type InfoBlockProps = WithSupportProps<{
  title?: string;
  groups: {
    title?: ReactNode;
    items: {
      label: ReactNode;
      value: ReactNode;
    }[];
  }[];
  buttonText?: string;
  onClick?(): void;
  showButton?: boolean;
}>;

export function BlockInfo({ title, groups, buttonText, onClick, showButton }: InfoBlockProps) {
  return (
    <S.InfoWrapper>
      <S.H3>{title}</S.H3>
      {groups.map(({ title, items }, groupIdx) => (
        <S.FieldsGroup key={groupIdx}>
          {title && <S.H4>{title}</S.H4>}

          <S.Fields>
            {items.map(({ label, value }, itemIdx, self) => {
              const notLast = itemIdx !== self.length - 1;

              return <InfoRow key={itemIdx} label={label} value={value} bottomDivider={notLast} />;
            })}
          </S.Fields>
        </S.FieldsGroup>
      ))}
      {showButton && buttonText && (
        <S.ButtonContainer>
          <Button onClick={onClick} text={buttonText} variant={Button.variants.Filled} />
        </S.ButtonContainer>
      )}
    </S.InfoWrapper>
  );
}
