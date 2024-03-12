import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { BellSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { AlarmFilledSVG } from '@snack-uikit/icons';
import { NotificationCard, NotificationCardProps, NotificationPanel } from '@snack-uikit/notification';

import { textProvider, Texts } from '../../helpers';

type ChipFilter = 'all' | 'unread';

export type NotificationsProps = {
  count: number;
  items: Omit<NotificationCardProps, 'onVisible'>[];
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
};

type NotificationsComponentProps = NotificationsProps & {
  open: boolean;
  className?: string;
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
}: NotificationsComponentProps) {
  const { hasMore, fetchMore } = loadCards || {};

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

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
      { value: 'all', label: textProvider(languageCode, Texts.NotificationsAll) },
      { value: 'unread', label: textProvider(languageCode, Texts.NotificationsUnread) },
    ],
    [languageCode],
  );

  const cards = useMemo(
    () => ({
      unread: items.filter(card => card.unread),
      read: items.filter(card => !card.unread),
    }),
    [items],
  );

  const hasCards = chipFilter === 'unread' ? cards.unread.length > 0 : items.length > 0;

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
    if (!open && chipFilter === 'unread') {
      handleTabChange('all');
    }
  }, [chipFilter, handleTabChange, open]);

  useEffect(() => {
    if (!hasMore || !fetchMore || chipFilter === 'unread') return;

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];

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
      scrollEndRef={scrollRef}
      loading={loading || isLoadingMore}
      skeletonsAmount={isLoadingMore ? 1 : undefined}
      title={textProvider(languageCode, Texts.Notifications)}
      chips={chips.map(chip => ({
        label: chip.label,
        checked: chip.value === chipFilter,
        onChange() {
          handleTabChange(chip.value);
        },
      }))}
      readAllButton={{
        onClick: readAll,
        label: textProvider(languageCode, Texts.MarkAllAsRead),
      }}
      footerButton={
        onFooterButtonClick && {
          label: textProvider(languageCode, Texts.NotificationsFooterButton),
          onClick: onFooterButtonClick,
        }
      }
      className={className}
      content={
        <>
          {showError && (
            <NotificationPanel.Blank
              icon={{
                icon: BellSVG,
                appearance: 'red',
              }}
              title={textProvider(languageCode, Texts.NotificationsErrorTitle)}
              description={textProvider(languageCode, Texts.NotificationsErrorDescription)}
            />
          )}

          {showBlank && (
            <NotificationPanel.Blank
              icon={{ icon: AlarmFilledSVG }}
              title={textProvider(languageCode, Texts.NoNotificationsTitle)}
              description={textProvider(languageCode, Texts.NoNotificationsDescription)}
            />
          )}

          {showCards && (
            <>
              {cards.unread.map(card => (
                <NotificationCard {...card} key={card.id} onVisible={handleCardVisible} />
              ))}

              {chipFilter === 'all' && (
                <>
                  {cards.unread.length > 0 && (
                    <NotificationPanel.Divider text={textProvider(languageCode, Texts.NotificationsDivider)} />
                  )}

                  {cards.read.map(card => (
                    <NotificationCard {...card} key={card.id} onVisible={handleCardVisible} />
                  ))}
                </>
              )}
            </>
          )}
        </>
      }
    />
  );
}
