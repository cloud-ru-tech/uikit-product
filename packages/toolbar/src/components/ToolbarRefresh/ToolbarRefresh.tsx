import { cx } from '@linaria/core';

import { rotateOnClickClassName } from '@sbercloud/uikit-product-button-private';
import { RefreshInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers/texts-provider';
import { ToolbarButton, ToolbarButtonProps } from '../ToolbarButton';
import { ICON_SIZE } from './constants';
import * as S from './styled';

export type ToolbarRefreshProps = Omit<ToolbarButtonProps, 'icon' | 'tooltip'>;

export function ToolbarRefresh(props: ToolbarRefreshProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  return (
    <ToolbarButton
      className={S.unpaddingButtonClassName}
      icon={<RefreshInterfaceSVG size={ICON_SIZE} className={cx(rotateOnClickClassName, S.sizedIconClassName)} />}
      data-test-id='toolbar__refresh-btn'
      tooltip={{ content: textProvider(languageCode, Texts.Refresh) }}
      {...props}
    />
  );
}
