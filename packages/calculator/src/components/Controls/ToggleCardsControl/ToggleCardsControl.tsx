import { useEffect, useMemo } from 'react';

import { CarouselProps } from '@snack-uikit/carousel';
import { FieldDecorator } from '@snack-uikit/fields';
import { ToggleGroup } from '@snack-uikit/toggles';

import { useAdaptive } from '../../../hooks';
import { FormValues } from '../../../types';
import { CarouselControlUi } from '../CarouselControl';
import { CONTROL } from '../constants';
import { ToggleCard, ToggleCardItem } from '../ToggleCard';
import { BaseControlWithItems } from '../types';
import styles from './styles.module.scss';

type UiProps = Pick<
  CarouselProps,
  'transition' | 'scrollBy' | 'className' | 'swipe' | 'infiniteScroll' | 'arrows' | 'showItems' | 'pagination' | 'gap'
>;

export type ToggleCardsControl = {
  type: typeof CONTROL.ToggleCards;
  accessorKey?: string;
  defaultValue?: string;
} & BaseControlWithItems<ToggleCardItem, UiProps>;

export type ToggleCardsControlUiProps = {
  value?: string;
  onChange?(value: string): void;
  watchedValues?: FormValues;
} & ToggleCardsControl;

function ToggleCardsControlUiDesktop({
  items: itemsProp,
  uiProps,
  value,
  onChange,
  decoratorProps,
  relateFn,
  watchedValues,
}: ToggleCardsControlUiProps) {
  const {
    items: relatedItems,
    decoratorProps: relatedDecoratorProps,
    uiProps: relatedUiProps,
  } = useMemo(() => relateFn?.(watchedValues ?? {}) ?? {}, [relateFn, watchedValues]);

  const items = useMemo(() => relatedItems ?? itemsProp, [itemsProp, relatedItems]);

  useEffect(() => {
    if (!items.find(item => String(item.value) === String(value))) {
      onChange?.(String(items?.[0]?.value));
    }
  }, [value, onChange, items, relatedItems]);

  const visible = relatedUiProps?.visible ?? uiProps?.visible ?? true;

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.carousel}>
      <FieldDecorator {...decoratorProps} {...relatedDecoratorProps}>
        <ToggleGroup
          selectionMode='single'
          value={value}
          onChange={value => {
            value && onChange?.(value);
          }}
        >
          <div className={styles.group}>
            {items.map(item => (
              <ToggleCard {...item} key={item.value} />
            ))}
          </div>
        </ToggleGroup>
      </FieldDecorator>
    </div>
  );
}
export function ToggleCardsControlUi(props: ToggleCardsControlUiProps) {
  const { isMobile } = useAdaptive();

  if (isMobile) {
    return <CarouselControlUi {...props} type={CONTROL.Carousel} />;
  }

  return <ToggleCardsControlUiDesktop {...props} />;
}
