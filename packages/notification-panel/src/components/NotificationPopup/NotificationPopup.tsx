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
import { Spinner } from '@sbercloud/uikit-product-spinner';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { Card, CardType } from '../../types';
import { Loading } from '../Loading';
import { NotificationCard } from '../NotificationCard';
import { ID_WRAPPER, Tab } from './constants';
import * as S from './styled';

export type NotificationPopupProps = WithSupportProps<{
  children?: ReactNode;
  cards: Card[];
  headerTooltip?: string;
  open: boolean;
  loadCards?: {
    fetchMore(): void;
    hasMore: boolean;
  };
  onToggle(value: boolean): void;
  onCardsRead(cardIds: string[]): void;
  onCardDelete(id: string): void;
  onReadAllButtonClick?(): void;
  onSeeAllButtonClick?(): void;
  onTabChange?({ activeTab }: { activeTab?: Tab }): void;
  loading?: boolean;
  error?: boolean;
}>;

export function NotificationPopup({
  headerTooltip,
  open,
  cards,
  loadCards = { hasMore: false, fetchMore: () => {} },
  onReadAllButtonClick,
  onSeeAllButtonClick,
  onToggle,
  onCardsRead,
  onCardDelete,
  onTabChange,
  loading,
  error,
  children,
  ...rest
}: NotificationPopupProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [activeTab, setActiveTab] = useState(Tab.All);
  const [visibleCardIds, setVisibleCardIds] = useState<string[]>([]);

  const newCards = useMemo(() => cards.filter(card => card.showNewBadge), [cards]);
  const selectedTabCards = activeTab === Tab.All ? cards : newCards;

  const hasCardsDataOnTab = selectedTabCards.length > 0;

  const handleCardVisible = (id: string) => {
    if (!visibleCardIds.includes(id)) {
      setVisibleCardIds(cards => [...cards, id]);
    }
  };

  const handleReadVisibleCards = () => {
    onCardsRead(visibleCardIds);
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

  const showError = !loading && error;
  const showNoData = !loading && !error && !hasCardsDataOnTab;
  const showData = !loading && !error && hasCardsDataOnTab;

  const showControlPanel =
    ((cards.length > 0 && Tab.All === activeTab) || Tab.New === activeTab) && !showError && !loading;
  const showFooter = hasCardsDataOnTab && onSeeAllButtonClick && cards.length > 0 && !showError && !loading;

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
                      handleChange={() => {
                        setActiveTab(value);
                        onTabChange?.({ activeTab: value });
                      }}
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

            {loading && (
              <Spinner
                size={Spinner.sizes.Large}
                text={textProvider(languageCode, Texts.LoadingText)}
                className={S.spinnerClassName}
              />
            )}

            {showError && (
              <S.ErrorWrapper>
                <NoData
                  image={
                    <PredefinedDecorIconPrivate
                      icon={PredefinedDecorIconPrivate.icons.Cancel}
                      type={PredefinedDecorIconPrivate.types.Predefined}
                      size={PredefinedDecorIconPrivate.sizes.Medium}
                    />
                  }
                  title={textProvider(languageCode, Texts.ErrorTitle)}
                  description={textProvider(languageCode, Texts.ErrorDescription)}
                />
              </S.ErrorWrapper>
            )}

            {showNoData && (
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

            {showData && (
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
NotificationPopup.tabs = Tab;

export type { Card };
