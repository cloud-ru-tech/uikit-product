import { ReactElement } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG, QuestionSmallOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { Variant } from '../Container';
import { HeaderAlign } from './constants';
import * as S from './styled';

export type SubtitleRenderProps = {
  className: string;
  'data-test-id': string;
};

export type HeaderProps = {
  align?: HeaderAlign;
  title: string;
  subtitle?: string | ((props: SubtitleRenderProps) => ReactElement<SubtitleRenderProps>);
  titleTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'icon' | 'iconAction'>;
  onClose(): void;
  variant?: Variant;
};

export function Header({ title, subtitle, titleTooltip, align = HeaderAlign.Left, variant, onClose }: HeaderProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <S.Wrapper data-align={align} data-test-id='modal-private__header'>
      {variant !== Variant.Forced && (
        <S.CloseButton
          icon={<CloseInterfaceSVG />}
          onClick={onClose}
          tooltip={{ content: textProvider(languageCode, Texts.Close) }}
          data-test-id='modal-private__close-btn'
        />
      )}

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

      {subtitle &&
        (typeof subtitle === 'string' ? (
          <TruncateString
            data-test-id='modal-private__header__subtitle'
            maxLines={2}
            className={S.subtitleClassName}
            text={subtitle}
          />
        ) : (
          subtitle({
            'data-test-id': 'modal-private__header__subtitle',
            className: S.subtitleClassName,
          })
        ))}
    </S.Wrapper>
  );
}

Header.aligns = HeaderAlign;
