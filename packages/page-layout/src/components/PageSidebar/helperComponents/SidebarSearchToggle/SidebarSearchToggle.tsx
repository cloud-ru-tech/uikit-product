import { SearchSVG, VerticalMenuRightCloseSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

import { useSearchContext } from '../../contexts';
import { textProvider, Texts } from '../../helpers/texts-provider';

export function SidebarSearchToggle() {
  const { searchOpened, setSearchValue, setSearchOpened } = useSearchContext();

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const toggle = () => {
    setSearchValue('');
    setSearchOpened(prev => !prev);
  };

  return (
    <Tooltip
      tip={searchOpened ? textProvider(languageCode, Texts.CloseSearch) : textProvider(languageCode, Texts.OpenSearch)}
    >
      <ButtonFunction size='s' onClick={toggle} icon={searchOpened ? <VerticalMenuRightCloseSVG /> : <SearchSVG />} />
    </Tooltip>
  );
}
