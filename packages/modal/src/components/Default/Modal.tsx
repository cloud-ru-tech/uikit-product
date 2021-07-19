import { Button, IconButton } from '@sbercloud/uikit-react-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-react-localization';
import { Tooltip } from '@sbercloud/uikit-react-tooltip';
import { useMemo } from 'react';
import RCModal from 'react-modal';

import { Texts, textProvider } from '../../helpers/texts-provider';
import {
  ButtonWrapper,
  Description,
  Title,
  buttonCSS,
  closeButtonStyle,
  contentClassname,
  overlayClassname,
} from './styled';

interface ReactModalProps extends ReactModal.Props {
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

export const MODAL_CLOSE_TYPE = {
  APPROVE: 'approve',
  CANCEL: 'cancel',
  CROSS: 'cross',
} as const;
export type ModalCloseType = typeof MODAL_CLOSE_TYPE[keyof typeof MODAL_CLOSE_TYPE];

export const Modal: React.FC<ModalProps> = props => {
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
    zIndex = 99999,
    parentId,
    parentSelector,
    alarmApproveButton,
  } = props;

  const language = useLanguage({ onlyEnabledLanguage: true });

  const approveBtnText = useMemo(() => approveText || textProvider(language, Texts.approve), [approveText, language]);
  const cancelBtnText = useMemo(() => cancelText || textProvider(language, Texts.cancel), [cancelText, language]);

  if (appElement) {
    RCModal.setAppElement(appElement as HTMLElement);
  }

  return (
    <RCModal
      {...props}
      style={{
        overlay: {
          ...(overlayOffset || {}),
          zIndex,
          position: parentId ? 'absolute' : 'fixed',
        },
        content: contentStyles || {},
      }}
      overlayClassName={overlayClassname}
      className={contentClassname}
      parentSelector={parentId ? (): HTMLElement => document.getElementById(parentId) || document.body : parentSelector}
    >
      {hideCross ? null : (
        <IconButton
          variant={IconButton.variants.Popup}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            onRequestClose?.(e, MODAL_CLOSE_TYPE.CROSS);
          }}
          className={closeButtonStyle}
        >
          <CloseInterfaceSVG />
        </IconButton>
      )}
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}
      {(approve || cancel) && (
        <ButtonWrapper>
          {approve &&
            (disableApprove && disableApproveTooltip ? (
              <Tooltip tooltip={disableApproveTooltip}>
                <Button
                  className={buttonCSS}
                  disabled={disableApprove}
                  variant={alarmApproveButton ? Button.variants.Alarm : Button.variants.Filled}
                  onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    approve(e);
                    onRequestClose?.(e, MODAL_CLOSE_TYPE.APPROVE);
                  }}
                >
                  {approveBtnText}
                </Button>
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
              >
                {approveBtnText}
              </Button>
            ))}
          {cancel && (
            <Button
              className={buttonCSS}
              variant={Button.variants.Outlined}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                cancel(e);
                onRequestClose?.(e, MODAL_CLOSE_TYPE.CANCEL);
              }}
            >
              {cancelBtnText}
            </Button>
          )}
        </ButtonWrapper>
      )}
    </RCModal>
  );
};
