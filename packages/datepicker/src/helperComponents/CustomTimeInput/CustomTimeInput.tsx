import { forwardRef, useEffect, useMemo, useState } from 'react';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { LanguageCodeType, useLanguage } from '@sbercloud/uikit-utils';

import { AmPmFormat, Texts, textProvider } from '../../helpers/texts-provider';
import * as S from './styled';

export interface ICustomTimeInputProps {
  date?: Date | null;
  open: boolean;
  onClick?: ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void) | undefined;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  disabled?: boolean;
  language: LanguageCodeType;
}

export const CustomTimeInput = forwardRef<HTMLInputElement, ICustomTimeInputProps>((props, ref) => {
  const { code: language } = useLanguage({ onlyEnabledLanguage: true });
  const { date, onClick, onChange, open, disabled } = props;
  const [value, setValue] = useState<string>('');

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(language, {
        hourCycle: AmPmFormat[language] ? 'h12' : 'h23',
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
