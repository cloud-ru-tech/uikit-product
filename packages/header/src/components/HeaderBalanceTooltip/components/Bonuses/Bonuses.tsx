import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, LanguageCodeType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Text, TextVariant } from '../Text';
import { GROUPING_START, NON_BREAKING_SPACE_SYMBOL } from './constants';
import * as S from './styled';

export type CurrencyProps = WithSupportProps<{
  value: number;
  unit?: string;
  tooltip?: string;
  variant?: TextVariant;
}>;

export function Bonuses({ value, tooltip, variant, unit, ...rest }: CurrencyProps) {
  const hasTooltip = tooltip !== undefined;

  const formattedValue = value.toLocaleString(LanguageCodeType.ruRU, {
    minimumFractionDigits: 0,
    useGrouping: value >= GROUPING_START,
  });

  const unitElement = unit && (
    <>
      {NON_BREAKING_SPACE_SYMBOL}
      {unit}
    </>
  );

  const text = (
    <S.BonusesContainer>
      <Text variant={variant} {...extractSupportProps(rest)}>
        {formattedValue}
        {unitElement}
      </Text>
    </S.BonusesContainer>
  );

  if (hasTooltip) {
    return (
      <Tooltip placement={Tooltip.placements.Bottom} type={Tooltip.types.Truncated} content={tooltip}>
        {text}
      </Tooltip>
    );
  }

  return text;
}
