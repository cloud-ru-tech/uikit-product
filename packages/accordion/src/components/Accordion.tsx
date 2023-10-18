import { ReactElement, ReactNode, useState } from 'react';

import { ButtonIcon, ButtonIconTransparent } from '@sbercloud/uikit-product-button';
import {
  ChevronDownInterfaceSVG,
  ChevronUpInterfaceSVG,
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
  action?: {
    onClick: VoidFunction;
    icon: ReactElement;
  };
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
  action,
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

  const actionClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (action) {
      action.onClick();
    }
  };

  return (
    <S.AccordionWrapper
      className={className}
      data-variant={variant}
      data-disabled={disabled || undefined}
      {...extractSupportProps(rest)}
    >
      <S.AccordionCard onClick={toggleIsOpened}>
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
          {action && <ButtonIconTransparent disabled={disabled} onClick={actionClickHandler} icon={action.icon} />}
          <ButtonIconTransparent
            disabled={disabled}
            icon={isOpened ? <ChevronUpInterfaceSVG /> : <ChevronDownInterfaceSVG />}
          />
        </S.AccordionButtons>
      </S.AccordionCard>

      <S.AccordionContentWrapStyled aria-hidden={!isOpened}>
        <S.AccordionContentStyled data-with-animation={hasAnimation || undefined} data-content>
          {content}
        </S.AccordionContentStyled>
      </S.AccordionContentWrapStyled>
    </S.AccordionWrapper>
  );
}

Accordion.variants = Variant;
