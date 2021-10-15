import React, { useState } from 'react';

import { ButtonGhost } from '@sbercloud/uikit-react-button';
import { Radio, RadioGroup } from '@sbercloud/uikit-react-radio';
import { useLanguage } from '@sbercloud/uikit-utils';

import { FilterTypes } from '../../constants';
import { Texts, textProvider } from '../../helpers/textProviders';
import { FilterItem } from '../../types';
import * as S from './styled';

export type RadioFiltersProps = {
  filter: {
    title: string;
    type: FilterTypes;
    items: FilterItem[];
  };
  activeRadio: string;
  onChange(title: string, field: string, type: FilterTypes): void;
  maxFiltersAmount: number;
};

export function RadioFilters({ filter, maxFiltersAmount, onChange, activeRadio }: RadioFiltersProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [isShown, toggle] = useState(true);
  const sliceTo = isShown ? maxFiltersAmount : undefined;
  const withButton = filter.items.length > maxFiltersAmount;
  const buttonName = isShown ? textProvider(languageCode, Texts.ShowAll) : textProvider(languageCode, Texts.Collapse);

  const handleClick = () => {
    toggle(!isShown);
  };

  const handleChange = (value: React.ReactText) => {
    onChange(filter.title, String(value), filter.type);
  };

  return (
    <>
      <RadioGroup value={activeRadio} onChange={handleChange}>
        {filter.items.slice(0, sliceTo).map(item => (
          <S.RadioWrap key={item.id}>
            <Radio label={item.name} value={item.name} />
            <S.Amount>{item.amount}</S.Amount>
          </S.RadioWrap>
        ))}
      </RadioGroup>
      {withButton && <ButtonGhost onClick={handleClick} className={S.buttonClassName} text={buttonName} />}
    </>
  );
}
