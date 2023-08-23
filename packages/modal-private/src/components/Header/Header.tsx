import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { QuestionSmallOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import { HeaderAlign } from './constants';
import * as S from './styled';

export type HeaderProps = {
  align?: HeaderAlign;
  title: string;
  subtitle?: string;
  titleTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'icon' | 'iconAction'>;
};

export function Header({ title, subtitle, titleTooltip, align = HeaderAlign.Left }: HeaderProps) {
  return (
    <S.Wrapper data-align={align} data-test-id='modal-private__header'>
      <S.TitleWrapper data-align={align}>
        <S.TitleWithTooltip>
          <S.Title
            data-test-id='modal-private__header__title'
            textEntity={TruncateString.textEntities.H3Semibold}
            text={title}
          />

          {titleTooltip && (
            <Tooltip {...titleTooltip} type={Tooltip.types.Instant} data-test-id='modal-private__header__title-tooltip'>
              <ButtonIcon icon={<QuestionSmallOutlineInterfaceSVG />} />
            </Tooltip>
          )}
        </S.TitleWithTooltip>

        <S.CloseButtonPlaceholder data-align={align} />
      </S.TitleWrapper>
      {subtitle && <S.Subtitle data-test-id='modal-private__header__subtitle' maxLines={2} text={subtitle} />}
    </S.Wrapper>
  );
}

Header.aligns = HeaderAlign;
