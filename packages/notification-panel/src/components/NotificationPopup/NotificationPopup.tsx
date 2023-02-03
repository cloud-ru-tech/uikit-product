import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react-dom-interactions';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ButtonGhost, ButtonIcon, ButtonIconTransparent } from '@sbercloud/uikit-product-button';
import { Chip } from '@sbercloud/uikit-product-chip';
import { CloseInterfaceSVG, NotifyInterfaceSVG, QuestionInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { NoData } from '@sbercloud/uikit-product-no-data';
import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { Card, CardType } from '../../types';
import { Loading } from '../Loading';
import { NotificationCard } from '../NotificationCard';
import { ID_WRAPPER, Tab } from './constants';
import * as S from './styled';

export type NotificationPopupProps = WithSupportProps<{
  children: ReactNode;
  cards: Card[];
  headerTooltip?: string;
  open: boolean;
  loadCards?: {
    fetchMore(): void;
    hasMore: boolean;
  };
  onToggle(value: boolean): void;
  onCardRead(id: string): void;
  onCardDelete(id: string): void;
  onReadAllButtonClick?(): void;
  onSeeAllButtonClick?(): void;
}>;

export function NotificationPopup({
  headerTooltip,
  open,
  cards,
  loadCards = { hasMore: false, fetchMore: () => {} },
  onReadAllButtonClick,
  onSeeAllButtonClick,
  onToggle,
  onCardRead,
  onCardDelete,
  children,
  ...rest
}: NotificationPopupProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [activeTab, setActiveTab] = useState(Tab.All);
  const [visibleCardIds, setVisibleCardIds] = useState<string[]>([]);

  const newCards = useMemo(() => cards.filter(card => card.showNewBadge), [cards]);
  const selectedTabCards = activeTab === Tab.All ? cards : newCards;

  const hasCardsDataOnTab = selectedTabCards.length > 0;
  const showControlPanel = cards.length > 0;
  const showFooter = hasCardsDataOnTab && onSeeAllButtonClick && cards.length > 0;

  const handleCardVisible = (id: string) => {
    if (!visibleCardIds.includes(id)) {
      setVisibleCardIds(cards => [...cards, id]);
    }
  };

  const handleReadVisibleCards = () => {
    visibleCardIds.forEach(id => onCardRead(id));
    setVisibleCardIds([]);
  };

  const handleClosePopup = () => {
    onToggle(false);
  };

  const { context, reference, floating, strategy } = useFloating({ open, onOpenChange: onToggle });
  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useDismiss(context)]);

  useEffect(() => {
    if (!open) {
      setActiveTab(Tab.All);
      handleReadVisibleCards();
    }
  }, [open]);

  return (
    <>
      <S.TriggerWrapper ref={reference} {...getReferenceProps()}>
        {children}
      </S.TriggerWrapper>

      {open && (
        <FloatingPortal root={document.body}>
          <S.FloatingWrapper ref={floating} strategy={strategy} {...getFloatingProps()} {...extractSupportProps(rest)}>
            <S.HeaderWrapper>
              <S.Title>
                {textProvider(languageCode, Texts.Notifications)}
                {headerTooltip && (
                  <Tooltip title={headerTooltip} placement={Tooltip.placements.Top} type={Tooltip.types.Truncated}>
                    <ButtonIcon icon={<QuestionInterfaceSVG />} />
                  </Tooltip>
                )}
              </S.Title>
              <ButtonIconTransparent
                data-test-id='notification-panel__close-button'
                icon={<CloseInterfaceSVG />}
                rounded
                onClick={handleClosePopup}
              />
            </S.HeaderWrapper>

            {showControlPanel && (
              <S.ControlPanel>
                <S.ChipsWrapper>
                  {[Tab.All, Tab.New].map(value => (
                    <Chip
                      data-test-id={`notification-panel__chip-${value}`}
                      key={value}
                      label={textProvider(languageCode, value === Tab.All ? Texts.All : Texts.New)}
                      checked={activeTab === value}
                      variant={Chip.variants.Primary}
                      size={Chip.sizes.Small}
                      handleChange={() => setActiveTab(value)}
                    />
                  ))}
                </S.ChipsWrapper>

                {onReadAllButtonClick && (
                  <ButtonGhost
                    data-test-id='notification-panel__read-all-button'
                    variant={ButtonGhost.variants.Secondary}
                    text={textProvider(languageCode, Texts.MarkAllAsRead)}
                    onClick={onReadAllButtonClick}
                  />
                )}
              </S.ControlPanel>
            )}

            {hasCardsDataOnTab ? (
              <S.CardsWrapper data-test-id='notification-panel__cards-wrapper' id={ID_WRAPPER}>
                <InfiniteScroll
                  dataLength={cards.length}
                  next={loadCards.fetchMore}
                  hasMore={loadCards.hasMore}
                  loader={<Loading />}
                  scrollableTarget={ID_WRAPPER}
                >
                  {selectedTabCards.map(card => (
                    <S.CardWrapper key={card.id}>
                      <NotificationCard
                        card={card}
                        onVisible={() => handleCardVisible(card.id)}
                        onDelete={() => onCardDelete(card.id)}
                      />
                    </S.CardWrapper>
                  ))}
                </InfiniteScroll>
                {loadCards.hasMore && <S.FakeChild />}
              </S.CardsWrapper>
            ) : (
              <S.NoDataWrapper>
                <NoData
                  image={
                    <PredefinedDecorIconPrivate
                      icon={<NotifyInterfaceSVG />}
                      type={PredefinedDecorIconPrivate.types.Custom}
                      size={PredefinedDecorIconPrivate.sizes.Medium}
                    />
                  }
                  title={textProvider(languageCode, Texts.NoNewNotificationsTitle)}
                  description={textProvider(languageCode, Texts.NoNewNotificationsDescription)}
                />
              </S.NoDataWrapper>
            )}

            {showFooter && (
              <S.FooterWrapper>
                {onSeeAllButtonClick && (
                  <ButtonGhost
                    variant={ButtonGhost.variants.Primary}
                    text={textProvider(languageCode, Texts.AllEvents)}
                    size={ButtonGhost.sizes.Small}
                    onClick={onSeeAllButtonClick}
                  />
                )}
              </S.FooterWrapper>
            )}
          </S.FloatingWrapper>
        </FloatingPortal>
      )}
    </>
  );
}

NotificationPopup.cardTypes = CardType;

export type { Card };
