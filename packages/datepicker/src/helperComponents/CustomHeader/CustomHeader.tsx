import { Button } from '@sbercloud/uikit-react-button';
import { ChevronLeftInterfaceSVG, ChevronRightInterfaceSVG } from '@sbercloud/uikit-react-icons';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import { ReactDatePickerProps } from 'react-datepicker';

import * as S from './styled';

export const CustomHeader: ReactDatePickerProps['renderCustomHeader'] = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <S.Container>
    <S.Title>{format(date, 'LLLL yyyy', { locale: ru })}</S.Title>

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
