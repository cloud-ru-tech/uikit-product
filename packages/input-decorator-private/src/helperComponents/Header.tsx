import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../helpers/texts-provider';
import * as S from './styled';

type HeaderProps = {
  optional?: boolean;
  label?: string;
  labelTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'icon' | 'iconAction'>;
  labelFor?: string;
};

export function Header({ optional, label, labelTooltip, labelFor }: HeaderProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  if (!optional && !label) return null;

  return (
    <S.FlexWrapper data-reverse={(optional && !label) || undefined} data-header>
      {label && (
        <div>
          {label && (
            <S.Label htmlFor={labelFor} data-test-id={'input-wrapper__label'}>
              {label}
            </S.Label>
          )}
          {labelTooltip && (
            <Tooltip
              classNameTrigger={S.LabelIconTriggerView}
              data-test-id={'input-wrapper__help-icon'}
              type={Tooltip.types.Instant}
              {...labelTooltip}
            >
              <S.LabelIcon />
            </Tooltip>
          )}
        </div>
      )}
      {optional && (
        <S.OptionalMark data-test-id={'input-wrapper__optional-mark'}>
          {textProvider(languageCode, Texts.Optional)}
        </S.OptionalMark>
      )}
    </S.FlexWrapper>
  );
}
