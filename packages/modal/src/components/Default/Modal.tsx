import { cx } from '@linaria/core';
import React, { useMemo } from 'react';
import RCModal from 'react-modal';

import { Button, ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractDataTestProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers/texts-provider';
import {
  buttonCSS,
  ButtonWrapper,
  closeButtonStyle,
  contentClassname,
  Description,
  overlayClassname,
  Title,
} from './styled';

export const MODAL_CLOSE_TYPE = {
  APPROVE: 'approve',
  CANCEL: 'cancel',
  CROSS: 'cross',
} as const;

export type ModalCloseType = typeof MODAL_CLOSE_TYPE[keyof typeof MODAL_CLOSE_TYPE];

interface ReactModalProps extends RCModal.Props {
  isOpen: boolean;
  portalClassName?: string;
  bodyOpenClassName?: string | null;
  htmlOpenClassName?: string | null;
  className?: string;

  onAfterClose?(): void;

  overlayClassName?: string;
  appElement?: HTMLElement;

  onRequestClose?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type?: ModalCloseType): void;

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

export interface ModalProps extends ReactModalProps {
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
  alarmApproveButton?: boolean;
}

export const Modal: React.FC<WithSupportProps<ModalProps>> & Pick<typeof RCModal, 'setAppElement'> = props => {
  const {
    isOpen,
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
    parentId,
    parentSelector,
    alarmApproveButton,
    className: propsClassName,
    overlayClassName: propsOverlayClassName,
  } = props;

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const approveBtnText = useMemo(
    () => approveText || textProvider(languageCode, Texts.Approve),
    [approveText, languageCode],
  );
  const cancelBtnText = useMemo(
    () => cancelText || textProvider(languageCode, Texts.Cancel),
    [cancelText, languageCode],
  );
  const closeBtnText = useMemo(() => textProvider(languageCode, Texts.Close), [languageCode]);

  if (appElement) {
    RCModal.setAppElement(appElement as HTMLElement);
  }

  const dataTestAttributes = useMemo(() => {
    const dataTestProps = extractDataTestProps(props);
    return Object.keys(dataTestProps).reduce((acc, key) => {
      const newKey = key.replace('data-', '');
      acc[newKey] = dataTestProps[key];
      return acc;
    }, {});
  }, [props]);

  return isOpen ? (
    <RCModal
      {...props}
      data={dataTestAttributes}
      style={{
        overlay: {
          ...(overlayOffset || {}),
          position: parentId ? 'absolute' : 'fixed',
        },
        content: contentStyles || {},
      }}
      className={cx(contentClassname, propsClassName)}
      overlayClassName={cx(overlayClassname, propsOverlayClassName)}
      parentSelector={parentId ? (): HTMLElement => document.getElementById(parentId) || document.body : parentSelector}
    >
      {hideCross ? null : (
        <ButtonIcon
          icon={<CloseInterfaceSVG />}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            onRequestClose?.(e, MODAL_CLOSE_TYPE.CROSS);
          }}
          tooltip={{ content: closeBtnText }}
          className={closeButtonStyle}
          data-test-id='modal__close-btn'
        />
      )}
      {title && <Title data-test-id='modal__title'>{title}</Title>}
      {description && <Description data-test-id='modal__description'>{description}</Description>}
      {(approve || cancel) && (
        <ButtonWrapper>
          {approve &&
            (disableApprove && disableApproveTooltip ? (
              <Tooltip content={disableApproveTooltip}>
                <Button
                  className={buttonCSS}
                  disabled={disableApprove}
                  variant={alarmApproveButton ? Button.variants.Alarm : Button.variants.Filled}
                  onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    approve(e);
                    onRequestClose?.(e, MODAL_CLOSE_TYPE.APPROVE);
                  }}
                  data-test-id='modal__approve-btn'
                  text={approveBtnText}
                />
              </Tooltip>
            ) : (
              <Button
                variant={alarmApproveButton ? Button.variants.Alarm : Button.variants.Filled}
                className={buttonCSS}
                disabled={disableApprove}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                  approve(e);
                  onRequestClose?.(e, MODAL_CLOSE_TYPE.APPROVE);
                }}
                data-test-id='modal__approve-btn'
                text={approveBtnText}
              />
            ))}
          {cancel && (
            <Button
              className={buttonCSS}
              variant={Button.variants.Transparent}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                cancel(e);
                onRequestClose?.(e, MODAL_CLOSE_TYPE.CANCEL);
              }}
              data-test-id='modal__cancel-btn'
              text={cancelBtnText}
            />
          )}
        </ButtonWrapper>
      )}
    </RCModal>
  ) : null;
};

Modal.setAppElement = RCModal.setAppElement;
