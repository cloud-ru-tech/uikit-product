import { useLocale } from '@sbercloud/uikit-product-locale';
import { NotificationCard, NotificationPanel } from '@snack-uikit/notification';

import { ChipFilter, NotificationItem } from './types';

enum CardsType {
  Read = 'read',
  Unread = 'unread',
  System = 'system',
}

type CardsMap = {
  [CardsType.Read]: NotificationItem[];
  [CardsType.Unread]: NotificationItem[];
  [CardsType.System]: NotificationItem[];
};

type Props = {
  cards: CardsMap;
  chipFilter: ChipFilter;
  handleCardVisible(id: string): void;
};

export function NotificationCards({ cards, chipFilter, handleCardVisible }: Props) {
  const { t } = useLocale('Header');

  return (
    <>
      {chipFilter === 'all' && (
        <>
          {cards.unread.map(card => (
            <NotificationCard {...card} key={card.id} onVisible={handleCardVisible} />
          ))}

          {
            <>
              {cards.unread.length > 0 && <NotificationPanel.Divider text={t('notificationsDivider')} />}

              {cards.read.map(card => (
                <NotificationCard {...card} key={card.id} onVisible={handleCardVisible} />
              ))}
            </>
          }
        </>
      )}

      {chipFilter === 'unread' && (
        <>
          {cards.unread.map(card => (
            <NotificationCard {...card} key={card.id} onVisible={handleCardVisible} />
          ))}
        </>
      )}

      {chipFilter === 'system' && (
        <>
          {cards.system.map(card => (
            <NotificationCard {...card} key={card.id} onVisible={handleCardVisible} />
          ))}
        </>
      )}
    </>
  );
}
