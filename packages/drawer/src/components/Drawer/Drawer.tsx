import 'rc-drawer/assets/index.css';

import { cx } from '@linaria/core';
import RcDrawer from 'rc-drawer';
import React, { useCallback, useEffect } from 'react';

import { IconButton } from '@sbercloud/uikit-react-button';
import { ArrowBoldLeftInterfaceSVG, CloseInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Header } from '../Header';
import {
  CloseButtonStyled,
  ContentBoxStyled,
  FooterBoxStyled,
  HeaderBoxStyled,
  HeaderTextBoxStyled,
  LeftIconBoxStyled,
  drawerClassName,
  drawerPaddingModeClassName,
  drawerWrapperClassName,
} from './styled';

export interface IDrawerProps {
  open: boolean;
  className?: string;
  hideHeader?: boolean;
  width?: string | number;
  footer?: React.ReactNode;
  placement?: 'left' | 'right';
  container?: string | HTMLElement;
  headerText?: string | React.ReactNode;
  onClose(): void;
  onBackClick?(): void;
}

export const Drawer: React.FC<WithSupportProps<IDrawerProps>> = ({
  open = false,
  width = '500px',
  placement = 'right',
  footer,
  onClose,
  children,
  container,
  className,
  headerText,
  hideHeader,
  onBackClick,
  ...restProps
}) => {
  const handleClick = useCallback(
    (e: Event) => {
      e.stopPropagation();

      // Если Drawer закрыт, то нет смысла вызывать onClose
      if (!open) {
        return;
      }

      // Если Drawer находится вне контейнера, тогда нам нет смысла добавлять наш обработчик
      if (!container) {
        return;
      }

      // Если e.target уже нет в DOM дереве, то обрабатывать нет смысла. Такое может быть, например, при клике на option Select.
      if (!e.target || !document.body.contains(e.target as HTMLElement)) {
        return;
      }

      // Далее идут проверки на то, что e.target находится внутри drawer.
      // Если container был передан как строка, тогда мы пытаемся его выбрать
      if (typeof container === 'string' && document.querySelector(container)?.contains(e.target as HTMLElement)) {
        return;
      }

      // Если container - Element
      if (typeof container !== 'string' && container.contains(e.target as HTMLElement)) {
        return;
      }

      onClose();
    },
    [container, onClose, open],
  );

  useEffect(() => {
    if (open) {
      window.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick, open]);

  return (
    <RcDrawer
      open={open}
      level={null}
      width={width}
      handler={false}
      onClose={onClose}
      placement={placement}
      wrapperClassName={drawerWrapperClassName}
      className={cx(className, drawerClassName, container && drawerPaddingModeClassName)}
      getContainer={container}
      {...extractSupportProps(restProps)}
    >
      {hideHeader ? null : (
        <HeaderBoxStyled width={typeof width === 'number' ? `${width}px` : width}>
          <HeaderTextBoxStyled>
            {onBackClick && (
              <LeftIconBoxStyled>
                <ArrowBoldLeftInterfaceSVG
                  size={20}
                  onClick={onBackClick}
                  data-test-action-id='drawer__header-back-btn'
                />
              </LeftIconBoxStyled>
            )}
            {headerText && <Header text={headerText} />}
          </HeaderTextBoxStyled>
          <CloseButtonStyled>
            <IconButton
              variant={IconButton.variants.Popup}
              onClick={onClose}
              data-test-action-id='drawer__header-close-btn'
            >
              <CloseInterfaceSVG />
            </IconButton>
          </CloseButtonStyled>
        </HeaderBoxStyled>
      )}
      <ContentBoxStyled data-hasfooter={!!footer || undefined}>{children}</ContentBoxStyled>
      {footer && <FooterBoxStyled width={typeof width === 'number' ? `${width}px` : width}>{footer}</FooterBoxStyled>}
    </RcDrawer>
  );
};
