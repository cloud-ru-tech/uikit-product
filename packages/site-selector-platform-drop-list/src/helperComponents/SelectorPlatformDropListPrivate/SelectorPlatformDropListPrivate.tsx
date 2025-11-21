import cn from 'classnames';
import { ReactNode, useCallback, useMemo, useState } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@cloud-ru/uikit-product-icons';
import { AdaptiveDroplist } from '@cloud-ru/uikit-product-mobile-dropdown';
import { MobileModalCustom } from '@cloud-ru/uikit-product-mobile-modal';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { DroplistProps } from '@snack-uikit/list';
import { Typography } from '@snack-uikit/typography';

import {
  BaseIcon,
  ContentItemList,
  IconItemList,
  SelectedItemList,
  TitleWithGoBack,
  Tooltip,
} from '../../helperComponents';
import {
  IconSelector,
  Item,
  MultipleSelectorPlatformDropListProps,
  SingleSelectorPlatformDropListProps,
  TooltipMobile,
} from '../../types';
import styles from './styles.module.scss';
import { findItems } from './utils';

type BaseSelectorPlatformDropListPrivateProps = WithLayoutType<{
  /** Заголовок верхней части блока выбора */
  title: string;
  /** Базовый заголовок нижней части блока выбора, отображается когда ничего не выбрано */
  baseTitle: string;
  /** Базовая иконка блока выбора слева, отображается когда ничего не выбрано */
  baseIcon?: IconSelector;
  /** Список элементов droplist */
  items: Array<Item>;
  /** Нижняя часть под списком droplist */
  footer?: ReactNode;
  loading?: boolean;
  triggerClassName?: string;
  /** Колбек отображения компонента. Срабатывает при изменении состояния open. */
  onOpenChange?: (isOpen: boolean) => void;
}>;

export type SelectorPlatformDropListPrivateProps = BaseSelectorPlatformDropListPrivateProps &
  (MultipleSelectorPlatformDropListProps | SingleSelectorPlatformDropListProps);

export function SelectorPlatformDropListPrivate({
  items,
  value,
  onChange,
  footer,
  title,
  baseTitle,
  baseIcon,
  layoutType,
  mode,
  loading,
  triggerClassName,
  onOpenChange,
}: SelectorPlatformDropListPrivateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipMobile, setTooltipMobile] = useState<TooltipMobile>({
    open: false,
  });

  const handleCloseTooltipMobile = () => {
    setTooltipMobile({
      open: false,
    });
  };

  const itemsView = useMemo(
    () =>
      items.map(item => ({
        id: item.id,
        content: <ContentItemList title={item.title} />,
        beforeContent: <IconItemList icon={item.icon} />,
        afterContent: item.tooltipText ? (
          <Tooltip setTooltipMobile={setTooltipMobile} tooltipText={item.tooltipText} layoutType={layoutType} />
        ) : null,
        className: styles.rowItem,
        onClick: item.onClick,
      })),
    [items, layoutType],
  );

  const itemsWithDivider: DroplistProps['items'] = useMemo(
    () => [...itemsView, { type: 'group', divider: true, items: [] }],
    [itemsView],
  );

  const selection = useMemo(
    () =>
      mode === 'multiple'
        ? ({ value, onChange, mode: 'multiple' } as MultipleSelectorPlatformDropListProps)
        : ({ value, onChange, mode: 'single' } as SingleSelectorPlatformDropListProps),
    [mode, onChange, value],
  );

  const foundItems = useMemo(() => findItems(items, value), [items, value]);

  const handleIsOpenChange = useCallback(
    (isOpen: boolean) => {
      setIsOpen(isOpen);
      onOpenChange?.(isOpen);
    },
    [onOpenChange],
  );

  return (
    <>
      <AdaptiveDroplist
        // @ts-expect-error label существует только у MobileDroplist, отсутствует у Droplist
        label={<TitleWithGoBack title='Облачная платформа' />}
        layoutType={layoutType}
        trigger='click'
        open={isOpen}
        items={footer ? itemsWithDivider : itemsView}
        onOpenChange={handleIsOpenChange}
        selection={selection}
        footer={footer}
        closeDroplistOnItemClick
        size='m'
        loading={loading}
      >
        <div className={cn(styles.root, triggerClassName)} data-focus={isOpen} role='button'>
          <BaseIcon baseIcon={baseIcon} value={foundItems} lengthDroplist={items.length} />
          <div className={styles.titleContainer}>
            <Typography className={styles.valueLabel} family='sans' purpose='body' size='s'>
              {title}
            </Typography>
            <SelectedItemList lengthDroplist={items.length} baseTitle={baseTitle} value={foundItems} />
          </div>
          <div className={styles.iconContainer}>
            {isOpen ? <ChevronUpSVG className={styles.icon} /> : <ChevronDownSVG className={styles.icon} />}
          </div>
        </div>
      </AdaptiveDroplist>
      <MobileModalCustom open={tooltipMobile.open} onClose={handleCloseTooltipMobile}>
        <MobileModalCustom.Header
          title={<TitleWithGoBack onGoBack={handleCloseTooltipMobile} title='Облачная платформа' />}
        />
        <MobileModalCustom.Body content={<Typography.SansBodyL>{tooltipMobile.text}</Typography.SansBodyL>} />
      </MobileModalCustom>
    </>
  );
}
