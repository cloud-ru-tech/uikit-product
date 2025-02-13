import { useEffect, useMemo, useState } from 'react';

import { ChevronLeftSVG, ChevronRightSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { Carousel, CarouselProps } from '@snack-uikit/carousel';
import { FieldDecorator } from '@snack-uikit/fields';
import { PaginationSlider } from '@snack-uikit/pagination';
import { ToggleGroup } from '@snack-uikit/toggles';

import { useAdaptive } from '../../../hooks';
import { FormValues } from '../../../types';
import { parseKeyToDataTest } from '../../../utils';
import { CONTROL } from '../constants';
import { ToggleCard, ToggleCardItem } from '../ToggleCard';
import { BaseControlWithItems } from '../types';
import styles from './styles.module.scss';

type CarouselUiProps = Pick<
  CarouselProps,
  | 'transition'
  | 'scrollBy'
  | 'className'
  | 'swipe'
  | 'infiniteScroll'
  | 'arrows'
  | 'showItems'
  | 'pagination'
  | 'gap'
  | 'swipeActivateLength'
>;

export type CarouselControl = {
  type: typeof CONTROL.Carousel;
  defaultValue?: string;
} & BaseControlWithItems<ToggleCardItem, CarouselUiProps>;

export type CarouselControlUiProps = {
  value?: string;
  onChange?(value: string): void;
  watchedValues?: FormValues;
} & CarouselControl;

export function CarouselControlUi({
  items: itemsProp,
  value,
  onChange,
  uiProps,
  decoratorProps,
  watchedValues,
  relateFn,
  accessorKey,
}: CarouselControlUiProps) {
  const { isMobile } = useAdaptive();

  const {
    items: relatedItems,
    decoratorProps: relatedDecoratorProps,
    uiProps: relatedUiProps,
  } = useMemo(() => relateFn?.(watchedValues ?? {}) ?? {}, [relateFn, watchedValues]);

  const items = useMemo(() => relatedItems ?? itemsProp, [itemsProp, relatedItems]);
  const [page, setPage] = useState<number>(0);

  const maxPage = isMobile ? items.length : items.length - 1;

  const dataTestAttribute = parseKeyToDataTest('carousel', accessorKey);
  const navigationDataTestAttribute = parseKeyToDataTest('carousel-navigation');

  useEffect(() => {
    const pageIndex = items.findIndex(item => String(item.value) === String(value));

    if (pageIndex !== -1) {
      const itemPage = isMobile ? pageIndex : Math.max(pageIndex - 1, 0);

      const timeout = setTimeout(() => {
        setPage(itemPage);
      }, 0);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isMobile, items, value]);

  useEffect(() => {
    const pageIndex = items.findIndex(item => String(item.value) === String(value));

    if (page > maxPage + 1) {
      setPage(pageIndex);
    }
  }, [value, onChange, items, page, maxPage]);

  const decPage = () => {
    setPage(page => Math.max(0, page - 1));
  };
  const incPage = () => {
    setPage(page => Math.min(page + 1, Math.max(maxPage - 1, 0)));
  };

  useEffect(() => {
    if (!items.find(item => String(item.value) === String(value))) {
      onChange?.(String(items?.[0]?.value));
      setPage(0);
    }
  }, [value, onChange, items, relatedItems]);

  const visible = relatedUiProps?.visible ?? uiProps?.visible ?? true;

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.carousel}>
      <FieldDecorator
        size='m'
        caption={
          maxPage > 1
            ? ((
                <div className={styles.controls}>
                  <ButtonFunction
                    icon={<ChevronLeftSVG />}
                    size='s'
                    onClick={decPage}
                    data-test-id={`${navigationDataTestAttribute}-button-left`}
                  />
                  <ButtonFunction
                    icon={<ChevronRightSVG />}
                    size='s'
                    onClick={incPage}
                    data-test-id={`${navigationDataTestAttribute}-button-right`}
                  />
                </div>
              ) as unknown as string)
            : undefined
        }
        {...decoratorProps}
        {...relatedDecoratorProps}
        data-test-id={dataTestAttribute}
      >
        <ToggleGroup
          selectionMode='single'
          value={value}
          onChange={value => {
            value && onChange?.(value);
          }}
        >
          <Carousel
            pagination={false}
            arrows={false}
            {...uiProps}
            scrollBy={1}
            swipe
            infiniteScroll={false}
            showItems={isMobile ? 1.1 : 2.1}
            state={{
              page: page || 0,
              onChange: page => setPage(page % maxPage),
            }}
          >
            {items.map(item => (
              <ToggleCard {...item} key={item.value} />
            ))}
          </Carousel>
        </ToggleGroup>

        <div className={styles.pagination}>
          {maxPage > 1 && <PaginationSlider page={page + 1} total={maxPage} onChange={page => setPage(page - 1)} />}
        </div>
      </FieldDecorator>
    </div>
  );
}
