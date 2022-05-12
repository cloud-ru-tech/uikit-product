import { ToastContentProps } from 'react-toastify';

import { PredefinedIconsPrivate } from '@sbercloud/uikit-react-predefined-icons-private';

import { TOASTER_SMALL_TEST_IDS } from '../../testIds';
import { ICON_STATUS_TYPE, ToasterSmallStatus } from './constants';
import * as S from './styled';

export type ToasterSmallProps = Partial<ToastContentProps> & {
  text: string;
  status?: ToasterSmallStatus;
};

export function ToasterSmall({ status = ToasterSmallStatus.Success, text }: ToasterSmallProps) {
  const hasStatusIcon = status !== ToasterSmallStatus.Neutral;

  return (
    <S.Wrapper data-test-id={`${TOASTER_SMALL_TEST_IDS.main}__${status}`}>
      <S.Container data-has-icon={hasStatusIcon || undefined}>
        {hasStatusIcon && (
          <PredefinedIconsPrivate
            icon={ICON_STATUS_TYPE[status]}
            variant={PredefinedIconsPrivate.variants.OnDark}
            className={S.statusIconClassName}
            data-test-id={TOASTER_SMALL_TEST_IDS.icon}
          />
        )}

        <S.Text data-test-id={TOASTER_SMALL_TEST_IDS.text}>{text}</S.Text>
      </S.Container>
    </S.Wrapper>
  );
}

ToasterSmall.statuses = ToasterSmallStatus;
