import { useMemo } from 'react';

import { SearchSVG, UpdateSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonTonal } from '@snack-uikit/button';
import { FieldSelectProps } from '@snack-uikit/fields';
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
