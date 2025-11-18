import { ReactNode, useMemo, useState } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@sbercloud/uikit-product-icons';
import { AdaptiveDroplist } from '@sbercloud/uikit-product-mobile-dropdown';
import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
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
        afterContent: (
          <Tooltip setTooltipMobile={setTooltipMobile} tooltipText={item.tooltipText} layoutType={layoutType} />
        ),
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

  return (
    <>
      <AdaptiveDroplist
        // @ts-expect-error label существует только у MobileDroplist, отсутствует у Droplist
        label={<TitleWithGoBack title='Облачная платформа' />}
        layoutType={layoutType}
        trigger='click'
        open={isOpen}
        items={footer ? itemsWithDivider : itemsView}
        onOpenChange={setIsOpen}
        selection={selection}
        footer={footer}
        closeDroplistOnItemClick
        size='m'
      >
        <div className={styles.root} data-focus={isOpen} role='button'>
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
