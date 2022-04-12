import 'rc-drawer/assets/index.css';

import { cx } from '@linaria/core';
import RcDrawer from 'rc-drawer';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { ArrowBoldLeftInterfaceSVG, CloseInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../../helpers/texts-provider';
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
  showCloseButton?: boolean;
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
  showCloseButton = true,
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
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const closeBtnText = useMemo(() => textProvider(languageCode, Texts.Close), [languageCode]);
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
  const [internalIsDrawerOpen, setInternalIsDrawerOpen] = useState(false);
  const timerRef = useRef<number>(0);

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
    clearTimeout(timerRef.current);
    if (open) {
      // Эта вся история нужна для того, чтобы не рендерить drawer в моменте, когда он закрыт. Сафари
      // обрабатывает drawer-mask таким образом, что он остается поверх, хоть и не видим => блочит любые действия
      // При открытии модалки:
      // Сначала мы должны отрендерить компоненту с состоянием open = false
      // Затем мы выставляем open = true, чтобы произошла анимация открытия
      setShouldRenderDrawer(true);
      setTimeout(() => setInternalIsDrawerOpen(true), 0);
      window.addEventListener('click', handleClick);
    } else {
      // Здесь мы сначала устанавливаем open = false,
      // И после закрытия Drawer удаляем его из DOM
      setInternalIsDrawerOpen(false);
      timerRef.current = window.setTimeout(() => {
        setShouldRenderDrawer(false);
        window.removeEventListener('click', handleClick);
      }, 500);
    }

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick, open]);

  if (!shouldRenderDrawer) {
    return null;
  }

  return (
    <RcDrawer
      open={internalIsDrawerOpen}
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
          {showCloseButton && (
            <CloseButtonStyled>
              <ButtonIcon
                icon={<CloseInterfaceSVG />}
                tooltip={{ content: closeBtnText }}
                onClick={onClose}
                data-test-action-id='drawer__header-close-btn'
              />
            </CloseButtonStyled>
          )}
        </HeaderBoxStyled>
      )}
      <ContentBoxStyled data-hasfooter={!!footer || undefined}>{children}</ContentBoxStyled>
      {footer && <FooterBoxStyled width={typeof width === 'number' ? `${width}px` : width}>{footer}</FooterBoxStyled>}
    </RcDrawer>
  );
};
