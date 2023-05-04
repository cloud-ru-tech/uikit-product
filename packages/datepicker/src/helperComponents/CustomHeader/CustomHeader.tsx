import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { ChevronLeftInterfaceSVG, ChevronRightInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers/texts-provider';
import * as S from './styled';

type HeaderCustomProps = {
  languageCode: LanguageCodeType;
};

type HeaderProps = {
  date: Date;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
};

export function CustomHeader(customProps: HeaderCustomProps, props: HeaderProps) {
  const { languageCode } = customProps;
  const { date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled } = props;

  const monthFormatter = new Intl.DateTimeFormat(languageCode, {
    month: 'long',
  });

  const title = `${monthFormatter.format(date)} ${new Date(date).getFullYear()}`;

  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      <ButtonIcon
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        tooltip={{ content: textProvider<string>(languageCode, Texts.Prev) }}
        icon={<ChevronLeftInterfaceSVG />}
      />

      <ButtonIcon
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        tooltip={{ content: textProvider<string>(languageCode, Texts.Next) }}
        icon={<ChevronRightInterfaceSVG />}
      />
    </S.Container>
  );
}
