import { error } from '@sbercloud/uikit-product-utils';

import { LOW_BALANCE_PERCENT } from './constants';
import * as S from './styled';

export type PieProps = {
  balance: number;
  limit: number;
};

export function Pie({ balance, limit }: PieProps) {
  error(limit < 0, '`limit` prop of `HeaderBalanceTooltipPie` component cannot be negative');
  error(balance > limit, '`balance` prop of `HeaderBalanceTooltipPie` component cannot be greater than `limit`');

  const percent = balance > 0 ? Math.floor((balance / limit) * 100) : 0;
  const isLow = percent <= LOW_BALANCE_PERCENT;

  return (
    <S.Pie
      percent={percent === 0 ? 100 : percent}
      data-low={isLow || undefined}
      data-test-id='header-balance-tooltip__pie'
      data-test-low={isLow || undefined}
      data-test-percent={percent}
    />
  );
}
