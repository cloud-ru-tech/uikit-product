import { useMemo } from 'react';

import { SearchSVG, UpdateSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { FieldSelectProps } from '@cloud-ru/uikit-product-mobile-fields';
import { ButtonTonal } from '@snack-uikit/button';
import { IconPredefinedProps } from '@snack-uikit/icon-predefined';

import { capitalize } from '../../helpers';
import { EntityName } from './types';

type Props = {
  onRefetch?: VoidFunction;
  entityName: EntityName;
  entityIcon?: IconPredefinedProps['icon'];
};

export function useSelectDataStates({ onRefetch, entityName, entityIcon }: Props) {
  const { t } = useLocale('FieldsPredefined');

  return useMemo<Pick<FieldSelectProps, 'noResultsState' | 'noDataState' | 'errorDataState'>>(
    () => ({
      noDataState: {
        icon: { icon: entityIcon ?? SearchSVG },
        description: `${capitalize(entityName.plural)} ${t('SelectCreate.noData')}`,
      },
      noResultsState: {
        icon: { icon: SearchSVG },
        description: (
          <>
            {capitalize(entityName.plural)} {t('SelectCreate.noResult')}.
            <br />
            {t('SelectCreate.changeRequest')} {entityName.single.toLocaleLowerCase()}
          </>
        ),
      },
      errorDataState: {
        description: `${t('SelectCreate.loadError')} ${entityName.plural.toLocaleLowerCase()}`,
        footer: onRefetch ? (
          <ButtonTonal
            label={t('SelectCreate.buttonRefetch')}
            icon={<UpdateSVG />}
            appearance='neutral'
            onClick={onRefetch}
          />
        ) : (
          <></>
        ),
      },
    }),
    [entityIcon, entityName, t, onRefetch],
  );
}
