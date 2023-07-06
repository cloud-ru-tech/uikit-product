import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';

import { Avatar } from '@sbercloud/uikit-product-avatar';
import { Badge } from '@sbercloud/uikit-product-badge-private';
import { DataCatalogServiceSVG, NotifyInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { PredefinedIconsPrivate } from '@sbercloud/uikit-product-predefined-icons-private';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Card, NotificationPopup, NotificationPopupProps } from '../src';

const meta: Meta = {
  title: 'Components/Notification Panel',
  component: NotificationPopup,
};
export default meta;

const avatarSrc =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80';

const redCardsIndex = [1, 5];

const ContentDescriptionBold = styled.span`
  font-weight: 600;
`;

function ContentDescription({ longName }: { longName?: boolean }) {
  return (
    <>
      <ContentDescriptionBold>[WorkspaceName]</ContentDescriptionBold> Description of{' '}
      <ContentDescriptionBold>
        EventName {longName && 'with looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong name'}
      </ContentDescriptionBold>
    </>
  );
}

const defaultCard: Card = {
  id: '',
  type: NotificationPopup.cardTypes.Default,
  showNewBadge: true,
  header: {
    headerIcon: <DataCatalogServiceSVG />,
    breadcrumbsTitles: ['Service Name', 'Subcategory'],
    time: '45 m',
  },
  content: {
    contentIcon: <PredefinedIconsPrivate icon={PredefinedIconsPrivate.icons.Success} />,
    title: 'Event type',
    avatar: {
      name: 'name',
      variant: Avatar.variants.User,
      src: avatarSrc,
    },
    description: <ContentDescription />,
    buttons: [{ text: 'Посмотреть логи', onClick: () => {} }],
    onCardClick: () => {},
  },
};

type StoryProps = NotificationPopupProps & { cardsCount: number; totalCardsCount: number };

function Template({ ...args }: StoryProps) {
  const { cardsCount, totalCardsCount, onReadAllButtonClick, open } = args;
  const [hasMore, setHasMore] = useState(cardsCount < totalCardsCount);
  const [cards, setCards] = useState<Card[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const handleReadAll = () => setCards(cards.map(card => ({ ...card, showNewBadge: false })));

  const handleCardRead = (cardIds: string[]) => {
    setCards(cards =>
      cards.map(card => ({ ...card, showNewBadge: cardIds.includes(card.id) ? false : card.showNewBadge })),
    );
  };

  const handleCardDelete = (id: string) => {
    setCards(cards => cards.filter(card => card.id !== id));
  };

  const fetchMore = useCallback(() => {
    if (cards.length >= totalCardsCount) {
      setHasMore(false);
      return;
    }

    const nextPortionAmount = cards.length + cardsCount;
    const newAmount = cardsCount - Math.max(nextPortionAmount - totalCardsCount, 0);

    setTimeout(() => {
      setCards(
        cards.concat(
          new Array(newAmount).fill(args.cards[0]).map((el, index) => ({
            ...el,
            content: {
              ...el.content,
              title: 'Loaded card. Event type ' + index,
            },
            header: {
              ...el.header,
            },
            id: 'Loaded card. Event type ' + index,
            type: redCardsIndex.includes(index)
              ? NotificationPopup.cardTypes.Alarm
              : NotificationPopup.cardTypes.Default,
          })),
        ),
      );
    }, 500);
  }, [args.cards, cards, cardsCount, totalCardsCount]);

  useEffect(() => {
    const newAmount = cardsCount < totalCardsCount ? cardsCount : totalCardsCount;

    setCards(
      new Array(newAmount).fill(args.cards[0]).map((el, index) => ({
        ...el,
        content: {
          ...el.content,
          title: 'Event type ' + index,
          description: Boolean(index) ? el.content.description : <ContentDescription longName />,
        },
        header: {
          ...el.header,
        },
        id: 'Event type ' + index,
        type: redCardsIndex.includes(index) ? NotificationPopup.cardTypes.Alarm : NotificationPopup.cardTypes.Default,
      })),
    );
    setHasMore(cardsCount < totalCardsCount);
  }, [args.cards, cardsCount, totalCardsCount]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <>
      <NotificationPopup
        {...args}
        open={isOpen}
        onToggle={setIsOpen}
        cards={cards}
        loadCards={{
          fetchMore,
          hasMore,
        }}
        onReadAllButtonClick={onReadAllButtonClick ? handleReadAll : undefined}
        onCardsRead={handleCardRead}
        onCardDelete={handleCardDelete}
      >
        <Badge type={Badge.types.Info} number={cards.filter(card => card.showNewBadge).length}>
          <NotifyInterfaceSVG data-test-id='open-notification-panel-button' fill={isOpen ? 'blue' : 'grey'} />
        </Badge>
      </NotificationPopup>
    </>
  );
}

export const notificationPanel: StoryFn<StoryProps> = Template.bind({});
notificationPanel.args = {
  headerTooltip: 'Уведомления',
  onReadAllButtonClick() {},
  onSeeAllButtonClick() {},
  cards: [defaultCard],
  open: true,
  totalCardsCount: 50,
  cardsCount: 11,
};

notificationPanel.argTypes = {
  totalCardsCount: {
    name: '[Stories]: Total cards count',
    control: {
      type: 'range',
      min: 0,
      max: 100,
    },
  },
  cardsCount: {
    name: '[Stories]: Cards to load count',
    control: {
      type: 'range',
      min: 0,
      max: 100,
    },
  },
};

notificationPanel.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=8412%3A105710',
  },
  badges: [BADGE.STABLE],
};
