import cn from 'classnames';
import { createRef, ReactElement, RefObject, useCallback, useEffect, useMemo } from 'react';

import { ArrowLeftSVG, ChevronDownSVG, ChevronUpSVG, OrganizationSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { FilterOption, useAdaptiveChipChoice } from '@sbercloud/uikit-product-mobile-chips';
import { Avatar } from '@snack-uikit/avatar';
import { ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { BaseItemProps, List, ListProps } from '@snack-uikit/list';
import { SearchPrivate } from '@snack-uikit/search-private';
import { SkeletonText, WithSkeleton } from '@snack-uikit/skeleton';
import { TruncateString } from '@snack-uikit/truncate-string';

import { useLocalStorage } from '../../hooks';
import { Organization, Project } from '../../types';
import {
  ProjectAfterContent,
  SelectMenuFooterButton,
  SelectMenuFooterButtonProps,
  SelectMenuProjectPlatformsProps,
  SelectMenuSkeletonItem,
  SelectMenuSort,
  SortVariant,
} from './components';
import { useSearch } from './hooks';
import styles from './styles.module.scss';
import { ItemsGroup } from './types';

export type SelectProps = {
  organizations?: Organization[];
  selectedOrganization?: Organization;
  onOrganizationChange?(value: Organization | undefined, source: 'user-menu' | 'select'): void;

  onOpenChange?(open: boolean): void;

  projects?: ItemsGroup<Project>[];
  projectsLoading?: boolean;
  selectedProject?: Project;
  onProjectChange?(value: Project): void;
  onProjectsSortChange?(sort: SortVariant): void;
  projectAddButton?: Omit<SelectMenuFooterButtonProps, 'label'>;

  projectsEmptyState?: ListProps['noDataState'];

  closeDropdown?(): void;

  platforms?: Pick<SelectMenuProjectPlatformsProps, 'onPlatformChange'> & {
    filterOptions: { label: string; value: string; caption?: string; icon: ReactElement }[];
    onFilterChange(platforms: string[]): void;
    filterValue: string[];
  };
};

type SelectMenuProps = SelectProps & {
  mobile: boolean;
};

export function SelectMenu({
  organizations: organizationsProp,
  selectedOrganization,
  onOrganizationChange,

  projects,
  selectedProject,
  onProjectChange: onProjectChangeProp,
  onProjectsSortChange,
  projectsLoading,
  projectAddButton,
  projectsEmptyState,

  closeDropdown,

  platforms,

  mobile,
  onOpenChange,
}: SelectMenuProps) {
  const { t } = useLocale('Header');
  const { t: chipsT } = useLocale('Chips');

  const AdaptiveChipChoice = useAdaptiveChipChoice({ layoutType: mobile ? 'mobile' : 'desktop' });

  const itemRefs: Record<string, RefObject<HTMLElement>> = useMemo(() => ({}), []);

  const noCatalogsInSort = projects && projects.length <= 1;

  const [sort, setSort] = useLocalStorage<SortVariant>(
    'header_projects_sort',
    noCatalogsInSort ? SortVariant.LastVisitedDesc : SortVariant.ByCatalogs,
  );

  useEffect(() => {
    if (selectedOrganization?.id && noCatalogsInSort && sort === SortVariant.ByCatalogs) {
      setSort(SortVariant.LastVisitedDesc);
    }
  }, [noCatalogsInSort, selectedOrganization?.id, setSort, sort]);

  const handleSortChange = (newSort?: SortVariant) => {
    // undefined returns if selected same element
    if (!newSort) {
      return;
    }

    setSort(newSort);
    onProjectsSortChange?.(newSort);
  };

  const organizations = useMemo(() => organizationsProp?.filter(org => !org.new), [organizationsProp]);

  const { searchRef, searchValue, setSearchValue, filteredGroups } = useSearch({
    groups: projects ?? [],
    searchable: true,
  });

  useEffect(() => {
    if (!mobile) {
      searchRef.current?.focus();
    }
  }, [mobile, searchRef]);

  const onProjectChange = useCallback(
    (item: Project) => {
      onProjectChangeProp?.(item);
      closeDropdown?.();
    },
    [onProjectChangeProp, closeDropdown],
  );

  const handleItemMouseDown = useCallback(
    ({ item }: { item: Project }) =>
      () => {
        onProjectChange?.(item);

        if (searchValue.length > 0) {
          setSearchValue('');

          setTimeout(() => {
            const selectedItem = itemRefs[item.id]?.current;
            selectedItem?.scrollIntoView({ block: 'center' });
          }, 0);
        }
      },
    [itemRefs, onProjectChange, searchValue.length, setSearchValue],
  );

  const getItemRef = useCallback(
    (id: string) => {
      if (!itemRefs[id]) {
        itemRefs[id] = createRef();
      }

      return itemRefs[id];
    },
    [itemRefs],
  );

  const onPlatformChange = platforms?.onPlatformChange;

  const mapProjectToListItem = useCallback(
    (item: Project): BaseItemProps => {
      const dataTestId = `header__select-group__item-${item.id}`;

      return {
        content: {
          option: item.name,
          truncate: { variant: 'middle' },
        },
        beforeContent: <Avatar appearance='neutral' size='xs' name={item.name} showTwoSymbols shape='square' />,
        afterContent: (
          <ProjectAfterContent
            mobile={mobile}
            dataTestId={dataTestId}
            project={item}
            closeDropdown={closeDropdown}
            onPlatformChange={onPlatformChange}
          />
        ),
        id: item.id,
        onMouseDown: handleItemMouseDown({ item }),
        'data-test-id': dataTestId,
        itemRef: getItemRef(item.id),
      };
    },
    [closeDropdown, getItemRef, handleItemMouseDown, mobile, onPlatformChange],
  );

  const items: ListProps['items'] = useMemo(() => {
    if (sort === SortVariant.ByCatalogs) {
      return filteredGroups.map(group => ({
        label: filteredGroups.length > 1 ? group.heading : undefined,
        truncate: { variant: 'middle' },
        mode: 'secondary',
        type: 'group',
        'data-test-id': `header__select-group-item-${group.id}`,
        items: group.items.map(mapProjectToListItem),
      }));
    }

    let listItems = filteredGroups.flatMap(group => group.items);

    switch (sort) {
      case SortVariant.AlphabeticalDesc: {
        listItems = listItems.toSorted((a, b) =>
          a.name.trim().toLowerCase().localeCompare(b.name.trim().toLowerCase()),
        );
        break;
      }
      case SortVariant.AlphabeticalAsc: {
        listItems = listItems.toSorted((a, b) =>
          b.name.trim().toLowerCase().localeCompare(a.name.trim().toLowerCase()),
        );
        break;
      }
      case SortVariant.DateDesc: {
        listItems = listItems.toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      }
      case SortVariant.DateAsc: {
        listItems = listItems.toSorted((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      }
      case SortVariant.LastVisitedDesc: {
        listItems = listItems.toSorted(
          (a, b) => new Date(b.lastVisitedAt).getTime() - new Date(a.lastVisitedAt).getTime(),
        );
        break;
      }
      case SortVariant.LastVisitedAsc: {
        listItems = listItems.toSorted(
          (a, b) => new Date(a.lastVisitedAt).getTime() - new Date(b.lastVisitedAt).getTime(),
        );
        break;
      }
      default: {
        break;
      }
    }

    return listItems.map(mapProjectToListItem);
  }, [filteredGroups, mapProjectToListItem, sort]);

  const organizationsOptions = useMemo(
    () => organizations?.map(org => ({ value: org.id, label: org.name })),
    [organizations],
  );

  const platformsOptions = useMemo<FilterOption[]>(() => {
    if (!platforms?.filterOptions.length) {
      return [];
    }

    return platforms.filterOptions.map(option => ({
      ...option,
      beforeContent: option.icon,
      contentRenderProps: {
        caption: option?.caption,
      },
    }));
  }, [platforms?.filterOptions]);

  const platformChipValueRender = useCallback(() => {
    if (!platforms?.filterOptions) {
      return '';
    }

    const filterValueLength = platforms.filterValue.length;

    if (!filterValueLength || filterValueLength === platforms.filterOptions.length) {
      return chipsT('allLabel');
    }

    const [first, ...rest] = platforms.filterValue;
    const firstLabel = platforms.filterOptions.find(option => option.value === first)?.label ?? first;

    if (!rest.length) {
      return firstLabel;
    }

    return `${firstLabel}, +${rest.length}`;
  }, [platforms?.filterValue, platforms?.filterOptions, chipsT]);

  const handleOrganizationChange = (value: string) => {
    const organization = organizations?.find(org => org.id === value);

    onOrganizationChange?.(organization, 'select');
  };

  const handleCloseMenu = () => onOpenChange?.(false);

  if (!projects) return null;

  return (
    <div
      className={styles.section}
      data-auto-height={items.length > 5 || false}
      data-mobile={mobile || undefined}
      data-test-id='header__select-project'
    >
      <div className={styles.headline} data-mobile={mobile || undefined}>
        {mobile && <ButtonFunction icon={<ArrowLeftSVG />} size='l' onClick={handleCloseMenu} />}

        <SearchPrivate
          size={mobile ? 'l' : 'm'}
          placeholder={t('searchProjectsPlaceholder')}
          value={searchValue}
          onChange={setSearchValue}
          ref={searchRef}
          data-test-id='header__select-project__search-input'
        />

        <SelectMenuSort
          noCatalogs={noCatalogsInSort}
          value={sort}
          onChange={handleSortChange}
          mobile={mobile}
          projectsLoading={projectsLoading}
        />
      </div>

      <div className={styles.functionBar}>
        {organizationsOptions && organizationsOptions.length > 1 && (
          <AdaptiveChipChoice.Single
            className={styles.organizationsChip}
            icon={<OrganizationSVG />}
            value={selectedOrganization?.id}
            onChange={handleOrganizationChange}
            options={organizationsOptions}
            size={mobile ? 'm' : 's'}
            loading={projectsLoading}
            data-test-id='header__select-project__organization-filter'
          />
        )}

        {platforms && platformsOptions.length > 0 && (
          <AdaptiveChipChoice.Multiple
            className={styles.platformsChip}
            label={t('platforms')}
            value={platforms.filterValue}
            onChange={platforms.onFilterChange}
            valueRender={platformChipValueRender}
            options={[
              {
                type: 'group-select',
                label: mobile ? undefined : t('platforms'),
                options: platformsOptions,
              },
            ]}
            size={mobile ? 'm' : 's'}
            loading={projectsLoading}
            data-test-id='header__select-project__platform-filter'
            dropDownClassName={styles.platformsChipDropdown}
          />
        )}
      </div>

      <Divider className={styles.divider} />

      {projectsLoading ? (
        <>
          <SelectMenuSkeletonItem />
          <SelectMenuSkeletonItem />
          <SelectMenuSkeletonItem />
        </>
      ) : (
        <>
          <List
            className={cn({ [styles.list]: mobile })}
            virtualized
            scroll
            scrollToSelectedItem
            marker
            size={mobile ? 'l' : 'm'}
            selection={selectedProject?.id ? { mode: 'single', value: selectedProject.id } : undefined}
            dataFiltered={searchValue.length > 0}
            noDataState={{
              description: t('noData'),
              ...projectsEmptyState,
              className: styles.noDataState,
            }}
            noResultsState={{
              description: t('noDataFound'),
              className: styles.emptySearch,
            }}
            items={items}
            pinBottom={
              projectAddButton
                ? [
                    {
                      content: <SelectMenuFooterButton {...projectAddButton} mobile={mobile} label={t('addProject')} />,
                      className: styles.pinBottom,
                      onClick: projectAddButton.onClick,
                      disabled: projectAddButton.disabled,
                    },
                  ]
                : undefined
            }
          />
        </>
      )}
    </div>
  );
}

const getIcon = (open: boolean) => (open ? <ChevronUpSVG size={16} /> : <ChevronDownSVG size={16} />);

function SelectMenuTriggerSkeleton() {
  return (
    <div className={styles.textWrapper}>
      <SkeletonText lines={1} className={styles.name} />
      <SkeletonText lines={1} className={styles.entity} />
    </div>
  );
}

export function SelectMenuTrigger({
  selectedProject,
  open,
  showIcon = true,
  loading,
  nameClassName,
  entityClassName,
}: {
  selectedProject?: Project;
  open: boolean;
  showIcon: boolean;
  loading?: boolean;
  nameClassName?: string;
  entityClassName?: string;
}) {
  const { t } = useLocale('Header');
  const name = selectedProject?.name ?? '';
  const entity = (selectedProject?.name && t('project')) || '';

  return (
    <WithSkeleton skeleton={<SelectMenuTriggerSkeleton />} loading={loading}>
      <div className={styles.contentLayout}>
        <div className={styles.textWrapper}>
          <span className={cn(styles.name, nameClassName)} data-test-id='header__select-project__value'>
            <TruncateString text={name} variant='middle' />
          </span>

          <span className={cn(styles.entity, entityClassName)} data-test-id='header__select-project__entity'>
            <TruncateString text={entity} variant='middle' />
          </span>
        </div>

        {showIcon && getIcon(open)}
      </div>
    </WithSkeleton>
  );
}
