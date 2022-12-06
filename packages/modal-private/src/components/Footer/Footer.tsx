import { MouseEventHandler, ReactElement } from 'react';

import { Button, ButtonGhost } from '@sbercloud/uikit-product-button';
import { LoadingWheelInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers/texts-provider';
import { FooterAlign } from './constants';
import * as S from './styled';

type CommonFooterButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactElement;
  disabledTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'placement'>;
};

export type ApproveButtonProps = CommonFooterButtonProps & {
  onClick: MouseEventHandler<HTMLElement>;
  text?: string;
  alarm?: boolean;
};

export type AdditionalButtonProps = CommonFooterButtonProps & {
  onClick?: MouseEventHandler<HTMLElement>;
  text: string;
};

export type CancelButtonProps = {
  onClick?: MouseEventHandler<HTMLElement>;
  text?: string;
};

export type FooterProps = {
  approveButton?: ApproveButtonProps;
  cancelButton?: CancelButtonProps;
  additionalButton?: AdditionalButtonProps;
  align?: FooterAlign;
};

export function Footer({ approveButton, cancelButton, additionalButton, align = FooterAlign.Right }: FooterProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const isLoading = approveButton?.loading || additionalButton?.loading;

  if (!additionalButton && !cancelButton && !approveButton) {
    return null;
  }

  return (
    <S.Wrapper data-align={align} data-test-id='modal-private__footer'>
      {additionalButton?.onClick && (
        <ButtonGhost
          onClick={additionalButton.onClick}
          text={additionalButton.text}
          disabled={additionalButton.disabled || isLoading}
          disabledTooltip={additionalButton.disabled ? additionalButton.disabledTooltip : undefined}
          icon={
            additionalButton.loading ? (
              <LoadingWheelInterfaceSVG className={S.loadingWheelClassName} />
            ) : (
              additionalButton.icon
            )
          }
          iconPosition={ButtonGhost.iconPosition.Before}
          variant={ButtonGhost.variants.Tertiary}
          data-test-id='modal-private__footer__additional-btn'
        />
      )}

      {cancelButton?.onClick && (
        <Button
          onClick={cancelButton?.onClick}
          text={cancelButton?.text || textProvider(languageCode, Texts.Cancel)}
          disabled={isLoading}
          variant={Button.variants.Transparent}
          data-test-id='modal-private__footer__cancel-btn'
        />
      )}

      {approveButton?.onClick && (
        <Button
          onClick={approveButton?.onClick}
          text={approveButton?.text || textProvider(languageCode, Texts.Approve)}
          disabled={approveButton.disabled || isLoading}
          disabledTooltip={approveButton.disabled ? approveButton.disabledTooltip : undefined}
          icon={
            approveButton.loading ? (
              <LoadingWheelInterfaceSVG className={S.loadingWheelClassName} />
            ) : (
              approveButton.icon
            )
          }
          variant={approveButton.alarm ? Button.variants.Alarm : Button.variants.Filled}
          data-test-id='modal-private__footer__approve-btn'
        />
      )}
    </S.Wrapper>
  );
}

Footer.aligns = FooterAlign;
