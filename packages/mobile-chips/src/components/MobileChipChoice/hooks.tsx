import FuzzySearch from 'fuzzy-search';
import { KeyboardEvent, KeyboardEventHandler, useCallback, useMemo } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { ItemId, MobileDroplistProps } from '@cloud-ru/uikit-product-mobile-dropdown';
import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';

import { CHIP_CHOICE_TEST_IDS } from '../../constants';
import styles from './styles.module.scss';
import { AccordionOption, BaseOption, ContentRenderProps, FilterOption, NestListOption } from './types';

type UseHandleOnKeyDownProps = {
  setOpen(open: boolean): void;
};

export function useHandleOnKeyDown({ setOpen }: UseHandleOnKeyDownProps) {
  return useCallback(
    (onKeyDown?: KeyboardEventHandler<HTMLElement>) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Space') {
        e.stopPropagation();
      } else {
        onKeyDown?.(e);
      }

      if (['ArrowDown'].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }

      if (['ArrowUp'].includes(e.key)) {
        e.preventDefault();
        setOpen(false);
      }

      if (e.key === 'Tab') {
        setOpen(false);
      }
    },
    [setOpen],
  );
}

const DEFAULT_MIN_SEARCH_INPUT_LENGTH = 2;

/**
 * Нечеткий поиск среди айтемов по полям 'content.option', 'content.caption', 'content.description', 'label'
 */
export function useOptionSearch<T extends ContentRenderProps = ContentRenderProps>({
  options,
  flatMapOptions,
  minSearchInputLength,
  disableFuzzySearch,
}: {
  options: FilterOption<T>[];
  flatMapOptions: (BaseOption<T> | AccordionOption<T> | NestListOption<T>)[];
  minSearchInputLength?: number;
  disableFuzzySearch?: boolean;
}) {
  return useCallback(
    (search: string) => {
      if (search.length < (minSearchInputLength ?? DEFAULT_MIN_SEARCH_INPUT_LENGTH)) return options;

      if (disableFuzzySearch) {
        return options.filter(option => {
          const fieldsForSearch = [option.label];

          if ('contentRenderProps' in option) {
            fieldsForSearch.push(option?.contentRenderProps?.description);
            fieldsForSearch.push(option?.contentRenderProps?.caption);
          }

          return fieldsForSearch
            .filter((v): v is ItemId => Boolean(v))
            .some(value => value.toString().includes(search));
        });
      }

      return new FuzzySearch(
        flatMapOptions,
        ['label', 'contentRenderProps.description', 'contentRenderProps.caption'],
        {},
      ).search(search);
    },
    [disableFuzzySearch, flatMapOptions, minSearchInputLength, options],
  );
}

type UseAutoApplyProps = {
  autoApply: boolean;
  onApprove(): void;
  onCancel(): void;
};

export function useAutoApplyFooter({
  autoApply,
  onApprove,
  onCancel,
}: UseAutoApplyProps): MobileDroplistProps['footer'] {
  const { t } = useLocale('Chips');

  return useMemo(() => {
    if (autoApply) {
      return null;
    }

    return (
      <div className={styles.autoApplyFooter} data-test-id={CHIP_CHOICE_TEST_IDS.footer}>
        <ButtonFunction
          fullWidth
          size='l'
          appearance='neutral'
          label={t('cancel')}
          onClick={onCancel}
          data-test-id={CHIP_CHOICE_TEST_IDS.cancelButton}
        />
        <ButtonFilled
          size='l'
          fullWidth
          appearance='primary'
          label={t('apply')}
          onClick={onApprove}
          data-test-id={CHIP_CHOICE_TEST_IDS.approveButton}
        />
      </div>
    );
  }, [t, autoApply, onApprove, onCancel]);
}
