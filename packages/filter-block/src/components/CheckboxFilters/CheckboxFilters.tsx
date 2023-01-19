import { useState } from 'react';

import { ButtonGhost } from '@sbercloud/uikit-product-button';
import { Checkbox } from '@sbercloud/uikit-product-checkbox';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { FilterTypes } from '../../constants';
import { textProvider, Texts } from '../../helpers/textProviders';
import { FilterItem } from '../../types';
import * as S from './styled';

export type CheckboxFiltersProps = {
  filter: {
    title: string;
    type: FilterTypes;
    items: FilterItem[];
  };
  activeItems: string[];
  onChange(title: string, field: string, type: FilterTypes): void;
  maxFiltersAmount: number;
};

export function CheckboxFilters({ filter, maxFiltersAmount, onChange, activeItems }: CheckboxFiltersProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [isShown, toggle] = useState(true);
  const sliceTo = isShown ? maxFiltersAmount : undefined;
  const withButton = filter.items.length > maxFiltersAmount;
  const buttonName = isShown ? textProvider(languageCode, Texts.ShowAll) : textProvider(languageCode, Texts.Collapse);

  const handleClick = () => {
    toggle(!isShown);
  };

  return (
    <>
      {filter.items.slice(0, sliceTo).map(item => (
        <S.CheckboxWrap key={item.id}>
          <Checkbox
            label={item.name}
            checked={activeItems.includes(item.id)}
            handleChange={() => onChange(filter.title, item.id, filter.type)}
          />
          <S.Amount>{item.amount}</S.Amount>
        </S.CheckboxWrap>
      ))}
      {withButton && <ButtonGhost onClick={handleClick} className={S.buttonClassName} text={buttonName} />}
    </>
  );
}
