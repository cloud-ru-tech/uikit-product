import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { ChevronLeftInterfaceSVG, ChevronRightInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { LanguageCodeType } from '@sbercloud/uikit-utils';

import * as S from './styled';

interface HeaderCustomProps {
  language: LanguageCodeType;
}
interface HeaderProps {
  date: Date;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

export const CustomHeader = (customProps: HeaderCustomProps, props: HeaderProps) => {
  const { language } = customProps;
  const { date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled } = props;

  const monthFormatter = new Intl.DateTimeFormat(language, {
    month: 'long',
  });
  const title = `${monthFormatter.format(date)} ${date.getFullYear()}`;

  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      <ButtonIcon onClick={decreaseMonth} disabled={prevMonthButtonDisabled} icon={<ChevronLeftInterfaceSVG />} />

      <ButtonIcon onClick={increaseMonth} disabled={nextMonthButtonDisabled} icon={<ChevronRightInterfaceSVG />} />
    </S.Container>
  );
};
