import { BalanceWrapper } from '../BalanceWrapper';
import { RegularText } from '../RegularText';

export function RubleSign() {
  return (
    <BalanceWrapper type='button' disabled>
      <RegularText>₽</RegularText>
    </BalanceWrapper>
  );
}
