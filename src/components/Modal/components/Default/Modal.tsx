import React from 'react';
import RCModal from 'react-modal';
import { CancelSVG } from '@aicloud/ui-icons';

import { Button } from 'components/Button';

import { BasicTooltip } from 'components/Tooltip';
import Z_INDEX from 'vars/zIndex';
import { COLORS_MODAL } from 'theme/color/vars';
import {
  closeButtonStyle,
  Title,
  Description,
  ButtonWrapper,
  buttonCSS,
} from './styled';

interface IReactModalProps extends ReactModal.Props {
  isOpen: boolean;
  portalClassName?: string;
  bodyOpenClassName?: string | null;
  htmlOpenClassName?: string | null;
  className?: string;
  onAfterClose?(): void;
  overlayClassName?: string;
  appElement?: HTMLElement;
  onRequestClose?(
    event: React.MouseEvent | React.KeyboardEvent,
    type?: ModalCloseType,
  ): void;
  closeTimeoutMS?: number;
  ariaHideApp?: boolean;
  shouldFocusAfterRender?: boolean;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;
  shouldReturnFocusAfterClose?: boolean;
  parentSelector?(): HTMLElement;
  role?: string | null;
  contentLabel?: string;
  contentRef?: (instance: HTMLDivElement) => void;
  overlayRef?: (instance: HTMLDivElement) => void;
  testId?: string;
  id?: string;
  hideCross?: boolean;
}

export type ModalOffsetType = {
  top?: React.ReactText;
  bottom?: React.ReactText;
  left?: React.ReactText;
  right?: React.ReactText;
};

export interface IModalProps extends IReactModalProps {
  isOpen: boolean;
  title?: string;
  description?: React.ReactNode;
  approveText?: string;
  disableApprove?: boolean;
  disableApproveTooltip?: string;
  approve?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  cancelText?: string;
  cancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  overlayOffset?: ModalOffsetType;
  contentStyles?: React.CSSProperties;
  zIndex?: number;
  parentId?: string;
}

export const MODAL_CLOSE_TYPE = {
  APPROVE: 'approve',
  CANCEL: 'cancel',
  CROSS: 'cross',
} as const;
export type ModalCloseType = typeof MODAL_CLOSE_TYPE[keyof typeof MODAL_CLOSE_TYPE];

// TODO Вынести в css-in-js
const customStyles = {
  overlay: {
    zIndex: Z_INDEX.MODAL,
    backgroundColor: 'rgba(52, 63, 72, 0.2)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 316,
    padding: 32,
    border: 0,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: 8,
    backgroundColor: `var(${COLORS_MODAL.BG})`,
  },
};

export const Modal: React.FC<IModalProps> = props => {
  const {
    onRequestClose,
    title,
    description,
    disableApprove,
    disableApproveTooltip,
    approve,
    cancel,
    approveText,
    cancelText,
    appElement,
    hideCross,
    overlayOffset,
    contentStyles,
    zIndex = Z_INDEX.MODAL,
    parentId,
    parentSelector,
  } = props;

  if (appElement) RCModal.setAppElement(appElement as HTMLElement);
  return (
    <RCModal
      {...props}
      style={{
        overlay: {
          ...customStyles.overlay,
          ...(overlayOffset || {}),
          zIndex,
          position: parentId ? 'absolute' : 'fixed',
        },
        content: { ...customStyles.content, ...(contentStyles || {}) },
      }}
      parentSelector={
        parentId
          ? (): HTMLElement =>
              document.getElementById(parentId) || document.body
          : parentSelector
      }
    >
      {hideCross ? null : (
        <Button
          type='transparent'
          onClick={(e): void => {
            onRequestClose?.(e, MODAL_CLOSE_TYPE.CROSS);
          }}
          className={closeButtonStyle}
        >
          <CancelSVG />
        </Button>
      )}
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}
      {(approve || cancel) && (
        <ButtonWrapper>
          {approve && disableApproveTooltip && (
            <BasicTooltip tooltip={disableApproveTooltip}>
              <Button
                className={buttonCSS}
                disabled={disableApprove}
                onClick={(e): void => {
                  approve(e);
                  onRequestClose?.(e, MODAL_CLOSE_TYPE.APPROVE);
                }}
              >
                {approveText || 'Подтвердить'}
              </Button>
            </BasicTooltip>
          )}
          {approve && (
            <Button
              className={buttonCSS}
              disabled={disableApprove}
              onClick={(e): void => {
                approve(e);
                onRequestClose?.(e, MODAL_CLOSE_TYPE.APPROVE);
              }}
            >
              {approveText || 'Подтвердить'}
            </Button>
          )}
          {cancel && (
            <Button
              className={buttonCSS}
              type='outlined'
              onClick={(e): void => {
                cancel(e);
                onRequestClose?.(e, MODAL_CLOSE_TYPE.CANCEL);
              }}
            >
              {cancelText || 'Отмена'}
            </Button>
          )}
        </ButtonWrapper>
      )}
    </RCModal>
  );
};
