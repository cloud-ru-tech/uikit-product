import { useMemo } from 'react';

import { SortSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';
import { Droplist, DroplistProps } from '@snack-uikit/list';

export enum SortVariant {
  DateAsc = 'dateAsc',
  DateDesc = 'dateDesc',
  AlphabeticalAsc = 'alphabeticalAsc',
  AlphabeticalDesc = 'alphabeticalDesc',
  ByCatalogs = 'byCatalogs',
}

type SelectMenuSortProps = {
  value: SortVariant;
  onChange(value: SortVariant): void;
  mobile: boolean;
  noCatalogs?: boolean;
  projectsLoading?: boolean;
};

export function SelectMenuSort({ value, onChange, mobile, noCatalogs, projectsLoading }: SelectMenuSortProps) {
  const { t } = useLocale('Header');

  const items = useMemo<DroplistProps['items']>(() => {
    const itemsWithoutGrouping = [
      {
        id: SortVariant.DateDesc,
        content: { option: t('sort.dateDesc.option'), caption: t('sort.dateDesc.caption') },
      },
      {
        id: SortVariant.DateAsc,
        content: { option: t('sort.dateAsc.option'), caption: t('sort.dateAsc.caption') },
      },
      {
        id: SortVariant.AlphabeticalDesc,
        content: { option: t('sort.alphabeticalDesc.option'), caption: t('sort.alphabeticalDesc.caption') },
      },
      {
        id: SortVariant.AlphabeticalAsc,
        content: { option: t('sort.alphabeticalAsc.option'), caption: t('sort.alphabeticalAsc.caption') },
      },
    ];

    if (noCatalogs) {
      return itemsWithoutGrouping;
    }

    return [
      {
        type: 'group',
        label: t('sort.withoutGrouping'),
        items: itemsWithoutGrouping,
      },
      {
        type: 'group',
        label: t('sort.withGrouping'),
        items: [{ id: SortVariant.ByCatalogs, content: { option: t('sort.byCatalogs.option') } }],
      },
    ];
  }, [noCatalogs, t]);

  return (
    <Droplist
      items={items}
      closeDroplistOnItemClick
      selection={{
        mode: 'single',
        value,
        onChange,
        defaultValue: '',
      }}
      data-test-id='header__select-project__sort-menu'
    >
      <ButtonFunction
        disabled={projectsLoading}
        icon={<SortSVG />}
        size={mobile ? 'l' : 'm'}
        data-test-id='header__select-project__sort-button'
      />
    </Droplist>
  );
}
