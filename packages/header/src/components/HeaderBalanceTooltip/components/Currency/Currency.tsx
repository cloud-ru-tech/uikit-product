import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, LanguageCodeType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { RegularText } from '../RegularText';
import { GROUPING_START } from './constants';
import * as S from './styled';

export type CurrencyProps = WithSupportProps<{
  value: number;
  isAccent?: boolean;
  tooltip: string;
}>;

export function Currency({ value, isAccent, tooltip, ...rest }: CurrencyProps) {
  const Text = isAccent ? S.AccentText : RegularText;

  return (
    <Tooltip placement={Tooltip.placements.Bottom} type={Tooltip.types.Tip} content={tooltip}>
      <Text {...extractSupportProps(rest)}>
        {value.toLocaleString(LanguageCodeType.ruRU, {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
          useGrouping: value >= GROUPING_START,
        })}
      </Text>
    </Tooltip>
  );
}
