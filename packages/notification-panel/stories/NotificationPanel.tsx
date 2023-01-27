import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
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

export default {
  title: 'Components/Notification Panel',
  component: NotificationPopup,
} as Meta;

const avatarSrc =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80';

const redCardsIndex = [1, 5];

const ContentDescriptionBold = styled.span`
  font-weight: 600;
`;

const ContentDescription = () => (
  <>
    <ContentDescriptionBold>[WorkspaceName]</ContentDescriptionBold> Description of{' '}
    <ContentDescriptionBold>EventName</ContentDescriptionBold>
  </>
);

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
  },
};

const Template: Story<NotificationPopupProps & { cardsCount: number; totalCardsCount: number }> = ({ ...args }) => {
  const { cardsCount, totalCardsCount, onReadAllButtonClick, open } = args;
  const [hasMore, setHasMore] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const handleReadAll = () => setCards(cards.map(card => ({ ...card, showNewBadge: false })));

  const handleCardRead = (id: string) => {
    setCards(cards => cards.map(card => ({ ...card, showNewBadge: card.id === id ? false : card.showNewBadge })));
  };

  const handleCardDelete = (id: string) => {
    setCards(cards => cards.filter(card => card.id !== id));
  };

  const fetchMore = useCallback(() => {
    if (cards.length >= totalCardsCount) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setCards(
        cards.concat(
          new Array(cardsCount).fill(args.cards[0]).map((el, index) => ({
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
  }, [cards, cardsCount, totalCardsCount]);

  useEffect(() => {
    setCards(
      new Array(cardsCount).fill(args.cards[0]).map((el, index) => ({
        ...el,
        content: {
          ...el.content,
          title: 'Event type ' + index,
        },
        header: {
          ...el.header,
        },
        id: 'Event type ' + index,
        type: redCardsIndex.includes(index) ? NotificationPopup.cardTypes.Alarm : NotificationPopup.cardTypes.Default,
      })),
    );
  }, [cardsCount]);

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
        onCardRead={handleCardRead}
        onCardDelete={handleCardDelete}
      >
        <Badge type={Badge.types.Info} number={cards.filter(card => card.showNewBadge).length}>
          <NotifyInterfaceSVG data-test-id='open-notification-panel-button' fill={isOpen ? 'blue' : 'grey'} />
        </Badge>
      </NotificationPopup>
    </>
  );
};

export const notificationPanel = Template.bind({});
notificationPanel.args = {
  headerTooltip: 'Уведомления',
  onReadAllButtonClick() {},
  onSeeAllButtonClick() {},
  cards: [defaultCard],
  open: true,
};

notificationPanel.argTypes = {
  totalCardsCount: {
    name: '[Stories]: Total cards count',
    defaultValue: 50,
    control: {
      type: 'range',
      min: 0,
      max: 100,
    },
  },
  cardsCount: {
    name: '[Stories]: Cards to load count',
    defaultValue: 11,
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
