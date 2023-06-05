import { ReactNode } from 'react';

import { Button } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';

import * as S from './styled';

export type InfoProps = {
  groups: {
    title?: ReactNode;
    items: {
      label: ReactNode;
      value: ReactNode;
    }[];
  }[];
  buttonText: string;
  onClick(): void;
  showButton?: boolean;
};

export function Info({ groups, buttonText, onClick, showButton }: InfoProps) {
  return (
    <S.InfoWrapper>
      {groups.map(({ title, items }, groupIdx) => (
        <div key={groupIdx}>
          {title && <S.H4>{title}</S.H4>}

          <S.Fields>
            {items.map(({ label, value }, itemIdx, self) => {
              const notLast = itemIdx !== self.length - 1;

              return (
                <S.FieldWrapper key={itemIdx}>
                  <S.Field>
                    <S.Label>{label}</S.Label>
                    <S.Value>{value}</S.Value>
                  </S.Field>
                  {notLast && <Divider variant={Divider.variants.Secondary} />}
                </S.FieldWrapper>
              );
            })}
          </S.Fields>
        </div>
      ))}
      {showButton && (
        <S.ButtonContainer>
          <Button onClick={onClick} text={buttonText} variant={Button.variants.Filled} />
        </S.ButtonContainer>
      )}
    </S.InfoWrapper>
  );
}
