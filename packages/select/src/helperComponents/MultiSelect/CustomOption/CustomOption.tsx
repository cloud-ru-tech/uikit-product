import { OptionProps } from 'react-select';

import { MultiselectOptionType } from '../../../helpers/types';
import * as S from './styled';

export function CustomOption(props: OptionProps<MultiselectOptionType, true>) {
  const { innerProps } = props;

  return (
    <S.CustomOption {...innerProps}>
      <S.Label>{props.data.label}</S.Label>

      {props.data.amount !== undefined && <S.Amount>{props.data.amount}</S.Amount>}
    </S.CustomOption>
  );
}
