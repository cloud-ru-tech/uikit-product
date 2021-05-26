import 'rc-drawer/assets/index.css';

import { cx } from '@linaria/core';
import RcDrawer from 'rc-drawer';

import { BackSVG, CrossSVG } from '@sbercloud/icons';

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
  onClose(): void;
  className?: string;
  width?: string | number;
  height?: string | number;
  placement?: 'left' | 'right';
  headerText?: string | React.ReactNode;
  footer?: React.ReactNode;
  hasPaddingMode?: boolean;
  container?: string | HTMLElement | (() => HTMLElement);
  onBackClick?(): void;
}

export const Drawer: React.FC<IDrawerProps> = ({
  open: openFromProps = false,
  width = '500px',
  height,
  className,
  placement = 'right',
  onClose: onCloseFromProps,
  onBackClick,
  headerText,
  footer,
  children,
  hasPaddingMode,
  container,
  ...ownProps
}) => (
  <RcDrawer
    level={null}
    width={width}
    height={height}
    className={cx(className, drawerClassName, hasPaddingMode && drawerPaddingModeClassName)}
    wrapperClassName={drawerWrapperClassName}
    handler={false}
    open={openFromProps}
    onClose={onCloseFromProps}
    placement={placement}
    getContainer={hasPaddingMode ? container : undefined}
    {...ownProps}
  >
    <HeaderBoxStyled width={typeof width === 'number' ? `${width}px` : width}>
      <HeaderTextBoxStyled>
        {onBackClick && (
          <LeftIconBoxStyled>
            <BackSVG size={20} onClick={onBackClick} />
          </LeftIconBoxStyled>
        )}
        {headerText && <Header text={headerText} />}
      </HeaderTextBoxStyled>
      <CloseButtonStyled onClick={onCloseFromProps}>
        <CrossSVG />
      </CloseButtonStyled>
    </HeaderBoxStyled>
    <ContentBoxStyled footerPadding={footer ? 80 : 0}>{children}</ContentBoxStyled>
    {footer && <FooterBoxStyled width={typeof width === 'number' ? `${width}px` : width}>{footer}</FooterBoxStyled>}
  </RcDrawer>
);
