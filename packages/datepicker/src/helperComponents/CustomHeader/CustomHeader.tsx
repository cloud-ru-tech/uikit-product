import { Button } from '@sbercloud/uikit-react-button';
import { ChevronLeftInterfaceSVG, ChevronRightInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { Languages } from '../../helpers/texts-provider';
import * as S from './styled';

interface HeaderCustomProps {
  language: Languages;
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

      <Button
        size={Button.sizes.s}
        variant={Button.variants.Transparent}
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <ChevronLeftInterfaceSVG data-disabled={prevMonthButtonDisabled || undefined} className={S.iconNavClassName} />
      </Button>

      <Button
        size={Button.sizes.s}
        variant={Button.variants.Transparent}
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <ChevronRightInterfaceSVG data-disabled={nextMonthButtonDisabled || undefined} className={S.iconNavClassName} />
      </Button>
    </S.Container>
  );
};
