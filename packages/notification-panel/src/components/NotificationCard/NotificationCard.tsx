import { cloneElement, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';

import { Avatar } from '@sbercloud/uikit-product-avatar';
import { ButtonGhost, ButtonIcon } from '@sbercloud/uikit-product-button';
import { DropdownItem, DropdownMenu, TDropdownMenuActionProps } from '@sbercloud/uikit-product-dropdown';
import { useEventHandler, useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { Card } from '../../types';
import * as S from './styled';

const HEADER_ICON_SIZE = 16;

export type NotificationCardProps = {
  card: Card;
  onVisible(): void;
  onDelete(): void;
};

export function NotificationCard({
  card: { id, type, showNewBadge, header, content },
  onVisible,
  onDelete,
}: NotificationCardProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMouseCardEnter, setIsMouseCardEnter] = useState(false);
  const { headerIcon, breadcrumbsTitles = [], time } = header || {};
  const { contentIcon = '', title = '', description = '', avatar, buttons, onCardClick } = content || {};
  const isNotificationClickable = Boolean(onCardClick);
  const isDropdownMenuVisible = isMouseCardEnter;
  const isTimeVisible = !isDropdownMenuVisible && Boolean(time);

  const handleIntersection = useEventHandler((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;

    if (showNewBadge && entry.isIntersecting) {
      onVisible();
    }
  });

  const handleMoreIconClick = (e: MouseEvent) => e.stopPropagation();

  const handleCardClick = () => onCardClick?.(id);

  const handleButtonClick = (e: MouseEvent<HTMLElement>, cb: MouseEventHandler<HTMLElement> | undefined) => {
    e.stopPropagation();

    cb && cb(e);
  };

  const handleMouseCardEnter = () => setIsMouseCardEnter(true);
  const handleMouseCardLeave = () => setIsMouseCardEnter(false);

  const getMenuActions = (props: TDropdownMenuActionProps) => {
    const handleOnDelete = () => {
      props.hide();
      onDelete();
    };

    return (
      <div data-modal-id='menu-actions'>
        <DropdownItem onClick={handleOnDelete}>{textProvider(languageCode, Texts.DeleteNotification)}</DropdownItem>
      </div>
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 1.0,
      rootMargin: '0px',
    });

    observer.observe(cardRef.current as HTMLElement);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return (
    <S.Wrapper
      data-test-id={`notification-card-${id}`}
      ref={cardRef}
      data-type={type}
      data-clickable={isNotificationClickable || undefined}
      onClick={handleCardClick}
      onMouseEnter={handleMouseCardEnter}
      onMouseLeave={handleMouseCardLeave}
    >
      <S.HeaderWrapper>
        <S.HeaderLeftSide>
          {headerIcon && (
            <S.HeaderIconWrapper>{cloneElement(headerIcon, { size: HEADER_ICON_SIZE })}</S.HeaderIconWrapper>
          )}
          {breadcrumbsTitles.join('・')}
        </S.HeaderLeftSide>

        <S.HeaderRightSide>
          <DropdownMenu actions={getMenuActions}>
            <ButtonIcon
              icon={<S.MoreIcon />}
              data-visible={isDropdownMenuVisible || undefined}
              className={S.DropdownMenuButtonIconView}
              onClick={handleMoreIconClick}
            />
          </DropdownMenu>

          <S.Time data-visible={isTimeVisible || undefined}>{time}</S.Time>
        </S.HeaderRightSide>
      </S.HeaderWrapper>

      <S.ContentWrapper>
        <S.ContentLeftSide>
          <S.ContentTitle>
            {contentIcon}
            {title}
          </S.ContentTitle>

          <S.ContentDescription>{description}</S.ContentDescription>

          {buttons && (
            <S.ButtonsWrapper>
              {buttons.map((button, index) => (
                <ButtonGhost
                  key={`${index}${button.text}`}
                  size={ButtonGhost.sizes.Small}
                  {...button}
                  onClick={event => handleButtonClick(event, button.onClick)}
                />
              ))}
            </S.ButtonsWrapper>
          )}
        </S.ContentLeftSide>

        <S.ContentRightSide>
          {avatar && <Avatar name={avatar.name} variant={avatar.variant} src={avatar.src} />}
        </S.ContentRightSide>
      </S.ContentWrapper>

      {showNewBadge && <S.Badge data-test-id='notification-card__badge' />}
    </S.Wrapper>
  );
}
