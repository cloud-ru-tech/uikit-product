import { rotateOnClickClassName } from '@sbercloud/uikit-react-button-private';
import { RefreshInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../../helpers/texts-provider';
import { ToolbarButton, ToolbarButtonProps } from '../ToolbarButton';

export type ToolbarRefreshProps = Omit<ToolbarButtonProps, 'icon' | 'tooltip'>;

export function ToolbarRefresh(props: ToolbarRefreshProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  return (
    <ToolbarButton
      icon={<RefreshInterfaceSVG className={rotateOnClickClassName} />}
      data-test-id='toolbar__refresh-btn'
      tooltip={{ content: textProvider(languageCode, Texts.Refresh) }}
      {...props}
    />
  );
}
