import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { forwardRef, useEffect, useMemo, useState } from 'react';

import { AmPmFormat, Languages, Texts, textProvider } from '../../helpers/texts-provider';
import * as S from './styled';

export interface ICustomTimeInputProps {
  date?: Date | null;
  open: boolean;
  onClick?: ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void) | undefined;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  disabled?: boolean;
  language: Languages;
}

export const CustomTimeInput = forwardRef<HTMLInputElement, ICustomTimeInputProps>((props, ref) => {
  const { date, onClick, onChange, open, disabled, language } = props;
  const [value, setValue] = useState<string>('');

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(language, {
        hour12: AmPmFormat[language],
        hour: 'numeric',
        minute: 'numeric',
      }),
    [language],
  );

  useEffect(() => {
    const nextValue = date ? timeFormatter.format(date) : '';
    setValue(nextValue);
  }, [timeFormatter, date]);

  return (
    <S.Container ref={ref} onClick={onClick}>
      <S.Input
        data-open={open || undefined}
        data-disabled={disabled || undefined}
        placeholder={textProvider(language, Texts.time)}
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
