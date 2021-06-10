import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-react-icons';
import format from 'date-fns/format';
import { forwardRef, useEffect, useState } from 'react';

import * as S from './styled';

export interface ICustomTimeInputProps {
  date: Date | null;
  open: boolean;
  onClick: ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void) | undefined;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  disabled?: boolean;
}

export const CustomTimeInput = forwardRef<HTMLInputElement, Partial<ICustomTimeInputProps>>((props, ref) => {
  const { date, onClick, onChange, open, disabled } = props;
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const nextValue = date ? format(date, 'HH:mm') : '';
    setValue(nextValue);
  }, [date]);

  return (
    <S.Container ref={ref} onClick={onClick}>
      <S.Input
        data-open={open || undefined}
        data-disabled={disabled || undefined}
        placeholder='Время'
        onChange={onChange}
        value={value}
        readOnly
      />
      <DropdownDownInterfaceSVG
        data-open={open || undefined}
        data-disabled={disabled || undefined}
        className={S.iconClassName}
      />
    </S.Container>
  );
});
