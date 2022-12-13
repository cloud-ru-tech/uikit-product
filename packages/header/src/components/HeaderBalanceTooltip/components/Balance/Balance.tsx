import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../../helpers';
import { BalanceWrapper } from '../BalanceWrapper';
import { Currency } from '../Currency';
import { RegularText } from '../RegularText';

type BalanceProps = {
  balance: number;
  limit?: number;
  onBalanceClick?(): void;
};

export function Balance({ balance, limit, onBalanceClick }: BalanceProps) {
  const { languageCode } = useLanguage();
  const hasLimitEntry = limit !== undefined;

  return (
    <BalanceWrapper type='button' onClick={onBalanceClick} disabled={!Boolean(onBalanceClick)}>
      <Currency
        value={balance}
        data-test-id='header-balance-tooltip__balance'
        isAccent={hasLimitEntry}
        tooltip={textProvider(languageCode, Texts.HeaderBalanceTooltipBalance)}
      />
      {hasLimitEntry && (
        <>
          <RegularText>/</RegularText>
          <Currency
            value={limit}
            data-test-id='header-balance-tooltip__limit'
            tooltip={textProvider(languageCode, Texts.HeaderBalanceTooltipLimit)}
          />
        </>
      )}
    </BalanceWrapper>
  );
}
