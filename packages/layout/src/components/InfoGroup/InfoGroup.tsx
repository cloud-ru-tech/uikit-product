import { ReactNode } from 'react';

import { Button } from '@sbercloud/uikit-product-button';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { InfoStroke } from '../InfoStroke';
import * as S from './styled';

export type InfoGroupProps = WithSupportProps<{
  items: {
    label: ReactNode;
    value: ReactNode;
  }[];
  itemDefaultValue?: ReactNode;
  buttonText?: string;
  onClick?(): void;
  showButton?: boolean;
}>;

export function InfoGroup({ items, itemDefaultValue, buttonText, onClick, showButton }: InfoGroupProps) {
  return (
    <>
      <div>
        {items.map(({ label, value }, itemIdx, self) => {
          const notLast = itemIdx !== self.length - 1;

          return <InfoStroke key={itemIdx} label={label} value={value || itemDefaultValue} bottomDivider={notLast} />;
        })}
      </div>
      {showButton && buttonText && (
        <S.ButtonContainer>
          <Button onClick={onClick} text={buttonText} variant={Button.variants.Filled} />
        </S.ButtonContainer>
      )}
    </>
  );
}
