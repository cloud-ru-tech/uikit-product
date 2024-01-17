import { useMemo, useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { PlaceholderSVG } from '@snack-uikit/icons';
import { NotificationCard, NotificationCardProps, NotificationPanel } from '@snack-uikit/notification';

import { textProvider, Texts } from '../../../../helpers';
import { BellIcon } from '../BellIcon';

export type NotificationsProps = {
  items: NotificationCardProps[];
  loading?: boolean;
  readAll?(): void;
};

enum ChipFilter {
  All = 'all',
  Unread = 'unread',
}

export function Notifications({ items, readAll, loading }: NotificationsProps) {
  const [chipFilter, setChipFilter] = useState(ChipFilter.All);
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const chips = useMemo(
    () => [
      { value: ChipFilter.All, label: textProvider(languageCode, Texts.NotificationsAll) },
      { value: ChipFilter.Unread, label: textProvider(languageCode, Texts.NotificationsUnread) },
    ],
    [languageCode],
  );

  const cards = useMemo(() => {
    if (chipFilter === ChipFilter.Unread) {
      return (items ?? []).filter(card => card.unread);
    }

    return [...(items ?? [])].sort((a, b) => Number(b.unread ?? 0) - Number(a.unread ?? 0));
  }, [chipFilter, items]);

  const numberOfUnreadNotifications = items.filter(card => card.unread).length ?? 0;

  return (
    <NotificationPanel
      loading={loading}
      title={textProvider(languageCode, Texts.Notifications)}
      chips={chips.map(chip => ({
        label: chip.label,
        checked: chip.value === chipFilter,
        onChange() {
          setChipFilter(chip.value);
        },
      }))}
      readAllButton={{
        onClick: readAll,
        label: textProvider(languageCode, Texts.MarkAllAsRead),
      }}
      triggerElement={
        <ButtonFunction
          size='m'
          icon={<BellIcon />}
          {...(numberOfUnreadNotifications > 0
            ? {
                counter: {
                  value: numberOfUnreadNotifications,
                  variant: numberOfUnreadNotifications > 9 ? 'count-plus' : 'count',
                },
              }
            : {})}
        />
      }
      content={
        cards.length ? (
          cards.map(card => <NotificationCard {...card} key={card.id} />)
        ) : (
          <NotificationPanel.Blank icon={PlaceholderSVG} title={textProvider(languageCode, Texts.NoNotifications)} />
        )
      }
    />
  );
}
