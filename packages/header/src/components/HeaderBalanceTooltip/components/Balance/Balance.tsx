import { ReactNode } from 'react';

import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../../helpers';
import { BalanceWrapper } from '../BalanceWrapper';
import { Bonuses } from '../Bonuses';
import { Currency } from '../Currency';
import { Text } from '../Text';
import { BalanceVariant } from './constants';

type BalanceProps = {
  customBalanceTooltip?: ReactNode;
  balance: number;
  balanceVariant?: BalanceVariant;
  bonuses?: number;
  bonusesUnit?: string;
  limit?: number;
  onBalanceClick?(): void;
};

export function Balance({
  customBalanceTooltip,
  balance,
  bonuses,
  bonusesUnit,
  limit,
  balanceVariant = BalanceVariant.AccentBalance,
  onBalanceClick,
}: BalanceProps) {
  const { languageCode } = useLanguage();
  const hasLimitEntry = limit !== undefined;
  const hasBonuses = bonuses !== undefined;
  const hasTooltip = customBalanceTooltip !== undefined;

  const getBalanceTextVariant = () => {
    if (hasLimitEntry) {
      return Text.variants.Primary;
    }
    if (balanceVariant === BalanceVariant.AccentBalance) {
      return Text.variants.Regular;
    }
    return Text.variants.Secondary;
  };

  const getBonusesTextVariant = () => {
    if (balanceVariant === BalanceVariant.AccentBonuses) {
      return Text.variants.Regular;
    }
    return Text.variants.Secondary;
  };

  const content = (
    <BalanceWrapper type='button' onClick={onBalanceClick} disabled={!Boolean(onBalanceClick)}>
      <Currency
        value={balance}
        data-test-id='header-balance-tooltip__balance'
        variant={getBalanceTextVariant()}
        tooltip={hasTooltip ? undefined : textProvider(languageCode, Texts.HeaderBalanceTooltipBalance)}
      />
      {hasLimitEntry && (
        <>
          <Text>/</Text>
          <Currency
            value={limit}
            data-test-id='header-balance-tooltip__limit'
            tooltip={hasTooltip ? undefined : textProvider(languageCode, Texts.HeaderBalanceTooltipLimit)}
          />
        </>
      )}
      {hasBonuses && (
        <Bonuses
          data-test-id='header-balance-tooltip__bonuses'
          value={bonuses}
          variant={getBonusesTextVariant()}
          tooltip={hasTooltip ? undefined : textProvider(languageCode, Texts.HeaderBalanceTooltipBonuses)}
          unit={bonusesUnit}
        />
      )}
    </BalanceWrapper>
  );

  if (hasTooltip) {
    return (
      <Tooltip placement={Tooltip.placements.Bottom} type={Tooltip.types.Truncated} content={customBalanceTooltip}>
        {content}
      </Tooltip>
    );
  }

  return content;
}
