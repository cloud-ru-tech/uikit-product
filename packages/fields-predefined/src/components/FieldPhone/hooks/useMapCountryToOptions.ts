import { useCallback } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';

import { Country, FieldPhoneOptionsProps } from '../types';

export function useMapCountryToOptions() {
  const { t } = useLocale('FieldsPredefined');

  const mapCountryToOption = useCallback(
    ({ value: id, mask, caption, beforeContent, iso2 }: Country): FieldPhoneOptionsProps => ({
      id,
      mask,
      content: {
        option: t(`FieldPhone.${id}`),
        caption: caption,
      },
      beforeContent,
      iso2,
    }),
    [t],
  );

  return mapCountryToOption;
}
