import { BalanceWrapper } from '../BalanceWrapper';
import { Text } from '../Text';

export function RubleSign() {
  return (
    <BalanceWrapper type='button' disabled>
      <Text>₽</Text>
    </BalanceWrapper>
  );
}
