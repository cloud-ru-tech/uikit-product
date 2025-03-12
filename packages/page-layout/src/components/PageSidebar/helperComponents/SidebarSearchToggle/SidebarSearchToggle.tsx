import { SearchSVG, VerticalMenuRightCloseSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

import { useSearchContext } from '../../contexts';

export function SidebarSearchToggle() {
  const { searchOpened, setSearchValue, setSearchOpened } = useSearchContext();

  const { t } = useLocale('PageLayout');

  const toggle = () => {
    setSearchValue('');
    setSearchOpened(prev => !prev);
  };

  return (
    <Tooltip tip={searchOpened ? t('PageSidebar.closeSearch') : t('PageSidebar.openSearch')}>
      <ButtonFunction size='s' onClick={toggle} icon={searchOpened ? <VerticalMenuRightCloseSVG /> : <SearchSVG />} />
    </Tooltip>
  );
}
