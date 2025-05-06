import cn from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AlarmFilledSVG, CrossSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { NotificationPanel, NotificationPanelProps } from '@snack-uikit/notification';

import { NotificationCards } from './NotificationCards';
import styles from './styles.module.scss';
import { ChipFilter, NotificationItem } from './types';

export type NotificationsProps = {
  count: number;
  items: NotificationItem[];
  loading?: boolean;
  error?: boolean;
  loadCards?: {
    fetchMore(): Promise<unknown>;
    hasMore: boolean;
  };
  readAll?(): void;
  onCardsRead(cardIds: string[]): void;
  onTabChange?(tab: ChipFilter): void;
  onFooterButtonClick?(): void;
  onNotifyTriggerClick?(): void;
  onOpenChange?(open: boolean): void;
  settings?: NotificationPanelProps['settings'];
};

type NotificationsComponentProps = NotificationsProps & {
  open: boolean;
  className?: string;
  isMobile?: boolean;
};

export function Notifications({
  open,
  items,
  readAll,
  loading,
  error,
  loadCards,
  onCardsRead,
  onTabChange,
  onFooterButtonClick,
  className,
  settings,
  isMobile,
}: NotificationsComponentProps) {
  const { hasMore, fetchMore } = loadCards || {};

  const { t } = useLocale('Header');

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRefObserver = useRef<IntersectionObserver>();

  const [isLoadingMore, setLoadingMore] = useState(false);

  const [visibleCardIds, setVisibleCardIds] = useState<string[]>([]);

  const handleCardVisible = useCallback((id: string) => {
    setVisibleCardIds(cards => (!cards.includes(id) ? [...cards, id] : cards));
  }, []);

  const [chipFilter, setChipFilter] = useState<ChipFilter>('all');

  const handleTabChange = useCallback<NonNullable<NotificationsProps['onTabChange']>>(
    tab => {
      setChipFilter(tab);
      onTabChange?.(tab);
    },
    [onTabChange],
  );

  const chips = useMemo<{ value: ChipFilter; label: string }[]>(
    () => [
      { value: 'all', label: t('notificationsAll') },
      { value: 'unread', label: t('notificationsUnread') },
      { value: 'system', label: t('notificationsSystem') },
    ],
    [t],
  );

  const cards = useMemo(
    () => ({
      unread: items.filter(card => card.unread),
      read: items.filter(card => !card.unread),
      system: items,
    }),
    [items],
  );

  const hasInitialCards = items.length > 0;
  const hasCards = chipFilter === 'unread' ? cards.unread.length > 0 : hasInitialCards;

  const showError = !loading && error;
  const showBlank = !loading && !error && !hasCards;
  const showCards = !loading && !error && hasCards;

  useEffect(() => {
    if (!open && visibleCardIds.length) {
      onCardsRead?.(visibleCardIds);
      setVisibleCardIds([]);
    }
  }, [onCardsRead, open, visibleCardIds]);

  useEffect(() => {
    if (!open && chipFilter !== 'all') {
      handleTabChange('all');
    }
  }, [chipFilter, handleTabChange, open]);

  useEffect(() => {
    if (!hasMore || !fetchMore || chipFilter === 'unread') return;

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities?.[0];

      if (target.isIntersecting && !isLoadingMore) {
        setLoadingMore(true);

        fetchMore().finally(() => setLoadingMore(false));
      }
    };

    scrollRefObserver.current = new IntersectionObserver(handleObserver);

    if (scrollRef.current) {
      scrollRefObserver.current.observe(scrollRef.current);
    }

    return () => {
      if (scrollRefObserver.current) {
        scrollRefObserver.current.disconnect();
      }
    };
  }, [hasMore, fetchMore, chipFilter, isLoadingMore]);

  return (
    <NotificationPanel
      settings={settings}
      scrollEndRef={scrollRef}
      loading={loading || isLoadingMore}
      skeletonsAmount={isLoadingMore ? 1 : undefined}
      title={t('notifications')}
      chips={
        showError
          ? undefined
          : chips.map(chip => ({
              label: chip.label,
              checked: chip.value === chipFilter,
              onChange() {
                handleTabChange(chip.value);
              },
            }))
      }
      readAllButton={
        showCards && chipFilter === 'all'
          ? {
              onClick: readAll,
              label: t('markAllAsRead'),
            }
          : undefined
      }
      footerButton={
        onFooterButtonClick && {
          label: t('notificationsFooterButton'),
          onClick: onFooterButtonClick,
        }
      }
      className={cn(className, { [styles.mobilePanel]: isMobile })}
      content={
        <>
          {showError && (
            <NotificationPanel.Blank
              icon={{
                icon: CrossSVG,
                appearance: 'neutral',
              }}
              title={t('notificationsErrorTitle')}
              description={t('notificationsErrorDescription')}
            />
          )}

          {showBlank && (
            <NotificationPanel.Blank
              icon={{ icon: AlarmFilledSVG }}
              title={t('noNotificationsTitle')}
              description={t('noNotificationsDescription')}
            />
          )}
          {showCards && (
            <NotificationCards cards={cards} handleCardVisible={handleCardVisible} chipFilter={chipFilter} />
          )}
        </>
      }
    />
  );
}
