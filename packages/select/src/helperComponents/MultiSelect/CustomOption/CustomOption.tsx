import { OptionProps } from 'react-select';

import { MultiselectOptionType } from '../../../helpers/types';
import * as S from './styled';

export function CustomOption(props: OptionProps<MultiselectOptionType, true>) {
  const { innerProps } = props;

  return (
    <S.CustomOption {...innerProps}>
      <S.Value>{props.data.value}</S.Value>
      <S.Amount>{props.data.amount}</S.Amount>
    </S.CustomOption>
  );
}
