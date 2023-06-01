import { ReactNode } from 'react';

import { ButtonIconTransparent } from '@sbercloud/uikit-product-button';
import { ChevronDownInterfaceSVG, DeleteInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Variant } from './constants';
import * as S from './styled';

export type AccordionProps = {
  header: string;
  subheader: string;
  content: string | ReactNode;
  onClose?(): void;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
};

export function Accordion({
  header,
  subheader,
  content,
  variant = Variant.Primary,
  className,
  disabled = false,
  onClose,
  ...rest
}: WithSupportProps<AccordionProps>) {
  return (
    <S.AccordionWrapper
      className={className}
      data-variant={variant}
      data-disabled={disabled || undefined}
      {...extractSupportProps(rest)}
    >
      <div>
        <S.AccordionHeader>{header}</S.AccordionHeader>
        <S.AccordionSubheader>{subheader}</S.AccordionSubheader>
      </div>
      <S.AccordionButtons>
        <ButtonIconTransparent onClick={onClose} icon={<DeleteInterfaceSVG />} />
        <ButtonIconTransparent icon={<ChevronDownInterfaceSVG />} />
      </S.AccordionButtons>
    </S.AccordionWrapper>
  );
}

Accordion.variants = Variant;
