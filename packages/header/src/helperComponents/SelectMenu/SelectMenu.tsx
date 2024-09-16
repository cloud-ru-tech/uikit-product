import cn from 'classnames';

import { ChevronDownSVG, ChevronUpSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Divider } from '@snack-uikit/divider';
import { ListProps } from '@snack-uikit/list';
import { SkeletonText, WithSkeleton } from '@snack-uikit/skeleton';
import { TruncateString } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../helpers';
import { Organization, Platform, Project, Workspace } from '../../types';
import { GroupSection, ItemsGroup } from '../GroupSection';
import styles from './styles.modules.scss';

export type SelectProps = {
  organizations?: Organization[];
  selectedOrganization?: Organization;
  onOrganizationChange?(value: Organization, source: 'user-menu' | 'select'): void;
  onOrganizationAdd?(): void;

  onOpenChange?(open: boolean): void;

  projects?: ItemsGroup<Project>[];
  projectsLoading?: boolean;
  projectsSearchActive?: boolean;
  onProjectsSearchActiveChange?(value: boolean): void;
  selectedProject?: Project;
  onProjectChange?(value: Project): void;
  projectAddButton?: {
    onClick(): void;
    tooltip?: string;
    disabled?: boolean;
  };

  projectsEmptyState?: ListProps['noDataState'];

  platforms?: Platform[];
  selectedPlatform?: Platform;
  onPlatformChange?(value: Platform): void;
  platformsLoading?: boolean;

  workspaces?: {
    list: Workspace[];
    selectedWorkspace?: Workspace;
    loading?: boolean;
    onWorkspaceChange(value: Workspace): void;
    onWorkspaceAdd(): void;
    emptyState?: ListProps['noDataState'];
    searchActive?: boolean;
    onSearchActiveChange?(value: boolean): void;
    tooltip?: string;
    disabled?: boolean;
  };

  onClose?(): void;

  closeDropdown?(): void;
};

const divider = (
  <div>
    <Divider orientation='vertical' />
  </div>
);

type SelectMenuProps = SelectProps & {
  mobile: boolean;
};

export function SelectMenu({
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd,

  projects,
  selectedProject,
  onProjectChange,
  projectsLoading,
  projectAddButton,
  projectsEmptyState,
  projectsSearchActive,
  onProjectsSearchActiveChange,

  platforms,
  selectedPlatform,
  onPlatformChange,
  platformsLoading,

  workspaces,

  closeDropdown,

  mobile,
}: SelectMenuProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const fixedColumnWidth = cn({ [styles.fixedColumnsWidth]: !mobile });
  const projectColumnWidth = cn({ [styles.projectColumnsWidth]: !mobile });
  const workspacesColumnWidth = cn({ [styles.workspacesColumnWidth]: !mobile });

  return (
    <>
      {organizations && (
        <GroupSection
          className={fixedColumnWidth}
          title={textProvider(languageCode, Texts.Organizations)}
          groups={[{ id: '1', items: organizations }]}
          truncateVariant='middle'
          onItemChange={val => onOrganizationChange?.(val, 'select')}
          selectedItem={selectedOrganization}
          addItem={{ label: textProvider(languageCode, Texts.AddOrganization), handler: onOrganizationAdd }}
          closeDropdown={closeDropdown}
          data-test-id='header__select-group-organization'
          avatarAppearance='red'
          mobile={mobile}
        />
      )}

      {projects && (
        <>
          {organizations && divider}

          <GroupSection
            className={projectColumnWidth}
            title={textProvider(languageCode, Texts.Projects)}
            searchable
            searchActive={projectsSearchActive}
            onSearchActiveChange={onProjectsSearchActiveChange}
            searchPlaceholder={textProvider(languageCode, Texts.SearchProjectsPlaceholder)}
            groups={projects}
            truncateVariant='middle'
            onItemChange={onProjectChange}
            selectedItem={selectedProject}
            noDataState={projectsEmptyState}
            addItem={
              projectAddButton && {
                label: textProvider(languageCode, Texts.AddProject),
                handler: projectAddButton.onClick,
                tooltip: projectAddButton.tooltip,
                disabled: projectAddButton.disabled,
              }
            }
            loading={projectsLoading}
            closeDropdown={closeDropdown}
            data-test-id='header__select-group-project'
            avatarAppearance='neutral'
            mobile={mobile}
          />
        </>
      )}

      {platforms && (
        <>
          {divider}

          <GroupSection
            className={fixedColumnWidth}
            title={textProvider(languageCode, Texts.Platforms)}
            groups={[{ id: '1', items: platforms }]}
            onItemChange={onPlatformChange}
            selectedItem={selectedPlatform}
            loading={platformsLoading}
            data-test-id='header__select-group-platform'
            mobile={mobile}
          />
        </>
      )}

      {workspaces && (
        <>
          {divider}

          <GroupSection
            className={workspacesColumnWidth}
            title={textProvider(languageCode, Texts.Workspaces)}
            groups={workspaces.list.length > 0 ? [{ id: '1', items: workspaces.list }] : []}
            onItemChange={workspaces.onWorkspaceChange}
            selectedItem={workspaces.selectedWorkspace}
            loading={workspaces.loading}
            noDataState={workspaces.emptyState}
            addItem={{
              label: textProvider(languageCode, Texts.AddWorkspace),
              handler: workspaces.onWorkspaceAdd,
              tooltip: workspaces.tooltip,
              disabled: workspaces.disabled,
            }}
            data-test-id='header__select-group-workspace'
            avatarAppearance='blue'
            searchable
            searchActive={workspaces.searchActive}
            onSearchActiveChange={workspaces.onSearchActiveChange}
            searchPlaceholder={textProvider(languageCode, Texts.SearchWorkspacesPlaceholder)}
            mobile={mobile}
          />
        </>
      )}
    </>
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
  selectedWorkspace,
  open,
  showIcon = true,
  loading,
  nameClassName,
  entityClassName,
}: {
  selectedProject?: Project;
  selectedWorkspace?: Workspace;
  open: boolean;
  showIcon: boolean;
  loading?: boolean;
  nameClassName?: string;
  entityClassName?: string;
}) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const name = selectedWorkspace?.name ?? selectedProject?.name ?? '';
  const entity =
    (selectedWorkspace?.name && textProvider(languageCode, Texts.Workspace)) ||
    (selectedProject?.name && textProvider(languageCode, Texts.Project)) ||
    '';

  return (
    <WithSkeleton skeleton={<SelectMenuTriggerSkeleton />} loading={loading}>
      <div className={styles.contentLayout}>
        <div className={styles.textWrapper}>
          <span className={cn(styles.name, nameClassName)} data-test-id='header__select-project-value'>
            <TruncateString text={name} variant='middle' />
          </span>

          <span className={cn(styles.entity, entityClassName)} data-test-id='header__select-project-entity'>
            <TruncateString text={entity} variant='middle' />
          </span>
        </div>

        {showIcon && getIcon(open)}
      </div>
    </WithSkeleton>
  );
}
