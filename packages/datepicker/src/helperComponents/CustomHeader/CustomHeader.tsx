import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { ChevronLeftInterfaceSVG, ChevronRightInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { LanguageCodeType } from '@sbercloud/uikit-utils';

import { CustomHeaderActions } from '../../helpers/texts-provider';
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

      <ButtonIcon
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        tooltip={CustomHeaderActions[language].prev}
        icon={<ChevronLeftInterfaceSVG />}
      />

      <ButtonIcon
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        tooltip={CustomHeaderActions[language].next}
        icon={<ChevronRightInterfaceSVG />}
      />
    </S.Container>
  );
};
