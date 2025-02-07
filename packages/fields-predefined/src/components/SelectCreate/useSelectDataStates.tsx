import { useMemo } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonTonal } from '@snack-uikit/button';
import { FieldSelectProps } from '@snack-uikit/fields';
import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { SearchSVG, UpdateSVG } from '@snack-uikit/icons';

import { capitalize } from '../../helpers';
import { textProvider, Texts } from './textsProvider';
import { EntityName } from './types';

type Props = {
  onRefetch?: VoidFunction;
  entityName: EntityName;
  entityIcon?: IconPredefinedProps['icon'];
};

export function useSelectDataStates({ onRefetch, entityName, entityIcon }: Props) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return useMemo<Pick<FieldSelectProps, 'noResultsState' | 'noDataState' | 'errorDataState'>>(
    () => ({
      noDataState: {
        icon: { icon: entityIcon ?? SearchSVG },
        description: `${capitalize(entityName.plural)} ${textProvider(languageCode, Texts.NoData)}`,
      },
      noResultsState: {
        icon: { icon: SearchSVG },
        description: (
          <>
            {capitalize(entityName.plural)} {textProvider(languageCode, Texts.NoResult)}.
            <br />
            {textProvider(languageCode, Texts.ChangeRequest)} {entityName.single.toLocaleLowerCase()}
          </>
        ),
      },
      errorDataState: {
        description: `${textProvider(languageCode, Texts.LoadError)} ${entityName.plural.toLocaleLowerCase()}`,
        footer: onRefetch ? (
          <ButtonTonal
            label={textProvider(languageCode, Texts.ButtonRefetch)}
            icon={<UpdateSVG />}
            appearance='neutral'
            onClick={onRefetch}
          />
        ) : (
          <></>
        ),
      },
    }),
    [entityIcon, entityName, languageCode, onRefetch],
  );
}
