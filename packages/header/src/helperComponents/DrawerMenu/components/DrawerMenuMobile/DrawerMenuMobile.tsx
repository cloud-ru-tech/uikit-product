import { MouseEvent, useCallback, useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Card } from '@snack-uikit/card';
import { Divider } from '@snack-uikit/divider';
import { DrawerCustom } from '@snack-uikit/drawer';
import { List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { Search } from '@snack-uikit/search';

import { textProvider, Texts } from '../../../../helpers';
import { getSelectProductListProps } from '../../../../hooks/useSelectProductList';
import { ProductOption } from '../../../../types';
import { DrawerMenuProps } from '../../types';
import { GroupCard } from '../GroupCard';
import { ProductSelectTrigger } from '../ProductSelectTrigger';
import { useLinks, useSearch } from './hooks';
import styles from './styles.modules.scss';

export function DrawerMenuMobile({
  open,
  onClose,
  links,
  footerLinks,
  onProductChange: onProductChangeProp,
  ...rest
}: DrawerMenuProps) {
  const { searchValue, setSearchValue, filteredLinks } = useSearch({ links });
  const { cardsRef } = useLinks({
    links,
    searchValue,
    setSearchValue,
  });

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const [innerOpen, setInnerOpen] = useState(false);

  const toggleInnerDrawer = () => setInnerOpen(prev => !prev);

  const wrappedClick = useCallback(
    ({ disabled, onClick }: { disabled?: boolean; onClick?(e?: MouseEvent<HTMLElement>): void }) =>
      (e?: MouseEvent<HTMLElement>) => {
        e?.preventDefault();

        if (disabled) {
          return;
        }

        onClose();

        onClick?.(e);
      },
    [onClose],
  );

  const onProductChange = useCallback(
    (product: ProductOption) => {
      setInnerOpen(false);
      onProductChangeProp(product);
    },
    [onProductChangeProp],
  );

  return (
    <>
      <DrawerCustom
        open={open}
        onClose={onClose}
        className={styles.drawer}
        position='left'
        size='s'
        push={{ distance: 8 }}
        nestedDrawer={
          <DrawerCustom open={innerOpen} onClose={toggleInnerDrawer} position='left' className={styles.nestedDrawer}>
            <DrawerCustom.Header title={'Платформы'} className={styles.nestedHeader} />

            <List {...getSelectProductListProps({ ...rest, onProductChange })} className={styles.nestedList} size='m' />
          </DrawerCustom>
        }
      >
        <DrawerCustom.Header title={'Навигация'} className={styles.nestedHeader} />

        <Scroll>
          <div className={styles.content}>
            <ProductSelectTrigger
              selectedProduct={rest.selectedProduct}
              className={styles.trigger}
              onClick={toggleInnerDrawer}
            />

            {links && (
              <Search
                size='m'
                placeholder={textProvider(languageCode, Texts.SearchByServices)}
                value={searchValue}
                onChange={setSearchValue}
                data-test-id='header__drawer-menu-search'
              />
            )}

            {filteredLinks &&
              filteredLinks.map((group, index) => (
                <GroupCard key={group.id} id={group.id} title={group.label} ref={el => (cardsRef.current[index] = el)}>
                  {group.items.map(item => (
                    <Card
                      outline
                      key={item.label}
                      onClick={wrappedClick(item)}
                      header={
                        <Card.Header title={item.label ?? ''} emblem={{ icon: item.icon, decor: false }} size='s' />
                      }
                      size='s'
                    />
                  ))}
                </GroupCard>
              ))}

            {filteredLinks?.length === 0 && (
              <div className={styles.noData}>{textProvider(languageCode, Texts.NoData)}</div>
            )}

            {footerLinks && (
              <div className={styles.footerLinks}>
                <div className={styles.footerLinksDivider}>
                  <Divider />
                </div>

                {footerLinks.map(link => (
                  <ButtonFunction
                    key={link.label}
                    iconPosition='before'
                    size='m'
                    {...link}
                    onClick={wrappedClick(link)}
                  />
                ))}
              </div>
            )}
          </div>
        </Scroll>
      </DrawerCustom>
    </>
  );
}
