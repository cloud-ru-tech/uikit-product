import { cx } from '@linaria/core';
import RCModal from 'react-modal';

import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { OverlayElement } from '../../helperComponents';
import { textProvider, Texts } from '../../helpers';
import { Size, Variant } from './constants';
import * as S from './styled';
import { ContainerProps } from './types';
import { getClosureProps, getDataTestAttributes } from './utils';

export function Container({
  isOpen,
  className: propsClassName,
  children,
  size = Size.Small,
  variant = Variant.Regular,
  ...rest
}: ContainerProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const { shouldCloseOnOverlayClick, shouldCloseOnEsc } = getClosureProps(variant);

  const handleOnClose = () => shouldCloseOnOverlayClick && 'onClose' in rest && rest.onClose();

  if (!isOpen) {
    return null;
  }

  return (
    <RCModal
      isOpen={isOpen}
      data={{ ...getDataTestAttributes(rest), size }}
      shouldCloseOnEsc={shouldCloseOnEsc}
      className={cx(S.contentClassname, propsClassName)}
      onRequestClose={handleOnClose}
      appElement={document.body}
      overlayElement={(_, content) => (
        <OverlayElement
          hasBlur={variant === Variant.Aggressive || variant === Variant.Forced}
          content={content}
          onClose={handleOnClose}
        />
      )}
    >
      {children}

      {variant !== Variant.Forced && (
        <S.CloseButton
          icon={<CloseInterfaceSVG />}
          onClick={'onClose' in rest ? rest.onClose : undefined}
          tooltip={{ content: textProvider(languageCode, Texts.Close) }}
          data-test-id='modal-private__close-btn'
        />
      )}
    </RCModal>
  );
}

Container.sizes = Size;
Container.variants = Variant;
