import { useMemo, useState } from 'react';

import { ButtonGhost } from '@sbercloud/uikit-product-button';
import { Chip } from '@sbercloud/uikit-product-chip';
import { InputCommon } from '@sbercloud/uikit-product-input';
import { Switch } from '@sbercloud/uikit-product-switch';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { COMPARE_OPTIONS, Comparison, DEFAULT_FILTER_VALUE } from './helpers/constants';
import { textProvider, Texts } from './helpers/texts-provider';
import { FilterNumberValue } from './helpers/types';
import * as S from './styled';

type FilterNumberProps = {
  onClear?: () => void;
  onChange?: (value: FilterNumberValue) => void;
  filterValue: FilterNumberValue;
};

const DEFAULT_COMPARISON = COMPARE_OPTIONS[0].value;

export function FilterNumber({ filterValue = DEFAULT_FILTER_VALUE, onClear, onChange }: FilterNumberProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const [startValue, setStartValue] = useState<string | undefined>(filterValue.startValue);
  const [endValue, setEndValue] = useState<string | undefined>(filterValue.endValue);
  const [isRange, setIsRange] = useState(Boolean(filterValue.endValue));
  const [comparison, setComparison] = useState(filterValue.comparison || DEFAULT_COMPARISON);

  const handleStartValueChange = (newValue: string) => {
    if (!/\D/.test(newValue)) {
      setStartValue(newValue);
      onChange?.({ startValue: newValue, endValue, comparison });
    }
  };

  const handleEndValueChange = (newValue: string) => {
    if (!/\D/.test(newValue)) {
      setEndValue(newValue);

      onChange?.({ startValue, endValue: newValue, comparison });
    }
  };

  const handleToggleRange = (isRange: boolean) => {
    setIsRange(isRange);
    const newValue = { startValue, endValue, comparison };

    if (comparison !== DEFAULT_COMPARISON) {
      setComparison(DEFAULT_COMPARISON);
      newValue.comparison = DEFAULT_COMPARISON;
    }

    if (!isRange) {
      setEndValue(undefined);
      newValue.endValue = undefined;
    }

    onChange?.(newValue);
  };

  const handleChangeComparison = (newValue: Comparison) => {
    setComparison(newValue);
    onChange?.({ startValue, endValue, comparison: newValue });
  };

  const handleClear = () => {
    setStartValue(undefined);
    setEndValue(undefined);
    setComparison(DEFAULT_COMPARISON);

    onChange?.(DEFAULT_FILTER_VALUE);
    onClear?.();
  };

  const filteredCompareOptions = useMemo(
    () => (isRange ? COMPARE_OPTIONS.filter(({ singleModeOnly }) => !singleModeOnly) : COMPARE_OPTIONS),
    [isRange],
  );

  return (
    <S.Container>
      <S.Switch>
        <S.Label>{textProvider<string>(languageCode, Texts.SetRange)}</S.Label>

        <Switch checked={isRange} onChange={handleToggleRange} />
      </S.Switch>

      <S.ChipsWrapper>
        {filteredCompareOptions.map(({ textKey, value }) => (
          <Chip
            key={value}
            label={textProvider<string>(languageCode, textKey)}
            size={Chip.sizes.Small}
            handleChange={() => handleChangeComparison(value)}
            checked={comparison === value}
          />
        ))}
      </S.ChipsWrapper>

      {isRange ? (
        <S.InputsContainer>
          <S.Label>{textProvider<string>(languageCode, Texts.From)}</S.Label>
          <InputCommon
            className={S.rangeInputClassName}
            value={startValue}
            onChange={handleStartValueChange}
            placeholder={textProvider<string>(languageCode, Texts.Value)}
          />
          <S.Label>{textProvider<string>(languageCode, Texts.To)}</S.Label>
          <InputCommon
            value={endValue}
            className={S.rangeInputClassName}
            onChange={handleEndValueChange}
            placeholder={textProvider<string>(languageCode, Texts.Value)}
          />
        </S.InputsContainer>
      ) : (
        <InputCommon
          value={startValue}
          onChange={handleStartValueChange}
          placeholder={textProvider<string>(languageCode, Texts.Value)}
        />
      )}

      <ButtonGhost
        onClick={handleClear}
        variant={ButtonGhost.variants.Secondary}
        text={textProvider<string>(languageCode, Texts.ClearData)}
      />
    </S.Container>
  );
}
