import { cx } from '@linaria/core';
import { PropsWithChildren } from 'react';
import RCModal from 'react-modal';

import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { OverlayElement } from '../../helperComponents';
import { textProvider, Texts } from '../../helpers';
import { Size, Variant } from './constants';
import * as S from './styled';
import { getClosureProps, getDataTestAttributes } from './utils';

export type ContainerProps = PropsWithChildren<
  WithSupportProps<{
    size?: Size;
    isOpen: boolean;
    className?: string;
    variant?: Variant;
    onClose(): void;
    hideCross?: boolean;
  }>
>;

export function Container({
  isOpen,
  className: propsClassName,
  children,
  onClose,
  size = Size.Small,
  variant = Variant.Regular,
  hideCross = false,
  ...rest
}: ContainerProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const { shouldCloseOnOverlayClick, shouldCloseOnEsc } = getClosureProps(variant);
  const handleOnClose = () => shouldCloseOnOverlayClick && onClose();

  if (!isOpen) {
    return null;
  }

  return (
    <RCModal
      isOpen={isOpen}
      data={{ ...getDataTestAttributes(rest), size }}
      shouldCloseOnEsc={shouldCloseOnEsc}
      className={cx(S.contentClassname, propsClassName)}
      onRequestClose={onClose}
      appElement={document.body}
      overlayElement={(_, content) => (
        <OverlayElement hasBlur={variant === Variant.Aggressive} content={content} onClose={handleOnClose} />
      )}
    >
      {children}

      {!hideCross && (
        <S.CloseButton
          icon={<CloseInterfaceSVG />}
          onClick={onClose}
          tooltip={{ content: textProvider(languageCode, Texts.Close) }}
          data-test-id='modal-private__close-btn'
        />
      )}
    </RCModal>
  );
}

Container.sizes = Size;
Container.variants = Variant;
