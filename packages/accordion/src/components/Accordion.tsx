import { ReactNode, useState } from 'react';

import { ButtonIcon, ButtonIconTransparent } from '@sbercloud/uikit-product-button';
import {
  ChevronDownInterfaceSVG,
  ChevronUpInterfaceSVG,
  DeleteInterfaceSVG,
  QuestionSmallOutlineInterfaceSVG,
} from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Variant } from './constants';
import * as S from './styled';

export type AccordionProps = WithSupportProps<{
  header: string;
  content: ReactNode;
  subheader?: string;
  isOpenDefault?: boolean;
  isOpen?: boolean;
  onChange?: (currentState: boolean) => void;
  onDelete?: VoidFunction;
  className?: string;
  tooltip?: string;
  variant?: Variant;
  disabled?: boolean;
  hasAnimation?: boolean;
}>;

export function Accordion({
  header,
  subheader,
  content,
  variant = Variant.Primary,
  className,
  disabled = false,
  isOpen,
  onChange,
  onDelete,
  tooltip,
  hasAnimation = true,
  isOpenDefault = false,
  ...rest
}: AccordionProps) {
  const [isOpenInternal, setIsOpenInternal] = useState(isOpenDefault);
  const isOpened = isOpen ?? isOpenInternal;

  const toggleIsOpened = () => {
    const isControlled = isOpen !== undefined && onChange !== undefined;
    return isControlled ? onChange(isOpened) : setIsOpenInternal(prev => !prev);
  };

  const deleteHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <S.AccordionWrapper
      onClick={toggleIsOpened}
      className={className}
      data-variant={variant}
      data-disabled={disabled || undefined}
      {...extractSupportProps(rest)}
    >
      <S.AccordionCard>
        <div>
          <S.AccordionHeader data-variant={variant} data-disabled={disabled || undefined}>
            {header}
            {tooltip && (
              <Tooltip type={Tooltip.types.Instant} content={tooltip}>
                <ButtonIcon
                  onClick={e => e.stopPropagation()}
                  disabled={disabled}
                  icon={<QuestionSmallOutlineInterfaceSVG />}
                  variant={ButtonIcon.variants.Weak}
                />
              </Tooltip>
            )}
          </S.AccordionHeader>
          {subheader && <S.AccordionSubheader data-disabled={disabled || undefined}>{subheader}</S.AccordionSubheader>}
        </div>
        <S.AccordionButtons>
          {onDelete && (
            <ButtonIconTransparent disabled={disabled} onClick={deleteHandler} icon={<DeleteInterfaceSVG />} />
          )}
          <ButtonIconTransparent
            disabled={disabled}
            icon={isOpened ? <ChevronUpInterfaceSVG /> : <ChevronDownInterfaceSVG />}
          />
        </S.AccordionButtons>
      </S.AccordionCard>

      <S.AccordionContentWrapStyled data-with-animation={hasAnimation || undefined} aria-hidden={!isOpened}>
        <div>
          <S.AccordionContentStyled>{content}</S.AccordionContentStyled>
        </div>
      </S.AccordionContentWrapStyled>
    </S.AccordionWrapper>
  );
}

Accordion.variants = Variant;
