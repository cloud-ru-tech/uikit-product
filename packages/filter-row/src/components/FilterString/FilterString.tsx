import { useState } from 'react';

import { ButtonGhost } from '@sbercloud/uikit-product-button';
import { Chip } from '@sbercloud/uikit-product-chip';
import { InputCommon } from '@sbercloud/uikit-product-input';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { COMPARE_OPTIONS, Comparison, DEFAULT_FILTER_VALUE } from './helpers/constants';
import { textProvider, Texts } from './helpers/textsProvider';
import { FilterStringValue } from './helpers/types';
import * as S from './styled';

type FilterStringProps = {
  onClear?(): void;
  onChange?(value: FilterStringValue): void;
  filterValue: FilterStringValue;
};

const DEFAULT_COMPARISON = COMPARE_OPTIONS[0].value;

export function FilterString({ filterValue = DEFAULT_FILTER_VALUE, onClear, onChange }: FilterStringProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const [value, setValue] = useState<string | undefined>(filterValue.value);
  const [comparison, setComparison] = useState(filterValue.comparison || DEFAULT_COMPARISON);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onChange?.({ value: newValue.trim(), comparison });
  };

  const handleChangeComparison = (newValue: Comparison) => {
    setComparison(newValue);
    onChange?.({ value, comparison: newValue });
  };

  const handleClear = () => {
    setValue(undefined);
    setComparison(DEFAULT_COMPARISON);
    onChange?.(DEFAULT_FILTER_VALUE);
    onClear?.();
  };

  return (
    <S.Container>
      <S.ChipsWrapper>
        {COMPARE_OPTIONS.map(({ textKey, value }) => (
          <Chip
            key={value}
            label={textProvider<string>(languageCode, textKey)}
            size={Chip.sizes.Small}
            handleChange={() => handleChangeComparison(value)}
            checked={comparison === value}
          />
        ))}
      </S.ChipsWrapper>

      <InputCommon
        value={value}
        onChange={handleValueChange}
        placeholder={textProvider<string>(languageCode, Texts.Value)}
      />

      <ButtonGhost
        onClick={handleClear}
        variant={ButtonGhost.variants.Secondary}
        text={textProvider<string>(languageCode, Texts.ClearData)}
      />
    </S.Container>
  );
}
