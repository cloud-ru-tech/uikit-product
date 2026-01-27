import cn from 'classnames';
import { useCallback, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { VerticalMenuCloseSVG, VerticalMenuOpenSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonElevated } from '@snack-uikit/button';
import { List, ListProps } from '@snack-uikit/list';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { SearchContextProvider } from './contexts';
import { SidebarSearch } from './helperComponents/SidebarSearch';
import { useItemsContent, useTopPinnedContent } from './hooks/useItemsCreator';
import { useSearchFilter } from './hooks/useSearchFilter';
import styles from './styles.module.scss';
import { Documentation, HeaderProps, SidebarItem } from './types';

export type PageSidebarProps = WithSupportProps<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChanged?(open: boolean): void;
  items: SidebarItem[];
  footerItems?: SidebarItem[];
  header?: HeaderProps;
  selected?: string | number;
  onSelect?(id: string | number): void;
  className?: string;
  documentation?: Documentation;
  pageContainerId?: string;
  hasSearch?: boolean;
  collapse?: ListProps['collapse'];
}>;

function PrivateSideBar({
  open: openProp,
  defaultOpen,
  onOpenChanged,
  className,
  items,
  footerItems = [],
  header,
  selected,
  onSelect,
  hasSearch,
  collapse,
  ...otherProps
}: PageSidebarProps) {
  const [open, setOpenState] = useUncontrolledProp(openProp, defaultOpen || true, onOpenChanged);
  const [hoverOff, setHoverOff] = useState(false);

  const toggleOpen = useCallback(
    (newValue: boolean = !open) => {
      if (newValue === open) {
        return;
      }

      if (!newValue) {
        /* кнопка сворачивания находится внутри сайдбара, а он открывается по ховеру на него,
        поэтому после клика на время отключаем ховер, чтоб дать ему закрыться */
        setHoverOff(true);
        setTimeout(() => setHoverOff(false), 300);
      }

      setOpenState(newValue);
    },
    [open, setOpenState],
  );

  const { filteredList, searchOpened, searchValue, searchCollapseState } = useSearchFilter(items);
  const list = useItemsContent(filteredList, onSelect);
  const footerList = useItemsContent(footerItems);
  const { pinTop } = useTopPinnedContent(header, hasSearch);

  return (
    <div
      // TODO: typescript error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      {...extractSupportProps(otherProps)}
      data-collapsed={!open || undefined}
      className={cn(styles.wrapper, className)}
    >
      {!open && (
        <ButtonElevated
          className={styles.expandButton}
          icon={<VerticalMenuOpenSVG />}
          onClick={() => toggleOpen(true)}
        />
      )}

      <div
        data-collapsed={!open || undefined}
        data-hover-off={hoverOff || undefined}
        data-has-search={hasSearch || undefined}
        className={styles.body}
      >
        <div className={styles.content} data-collapsed={!open || undefined}>
          <div className={styles.list}>
            <List
              selection={{ mode: 'single', value: selected }}
              size='m'
              items={list}
              pinTop={pinTop}
              pinBottom={footerList}
              scroll
              scrollToSelectedItem
              collapse={searchValue ? searchCollapseState : collapse}
              barHideStrategy='leave'
            />
            {hasSearch && searchOpened && (
              <div className={styles.searchWrapper}>
                <SidebarSearch />
              </div>
            )}
          </div>
          <div className={styles.toggler}>
            <ButtonElevated
              icon={open ? <VerticalMenuCloseSVG /> : <VerticalMenuOpenSVG />}
              onClick={() => toggleOpen()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageSidebar(props: PageSidebarProps) {
  return (
    <SearchContextProvider>
      <PrivateSideBar {...props} />
    </SearchContextProvider>
  );
}
