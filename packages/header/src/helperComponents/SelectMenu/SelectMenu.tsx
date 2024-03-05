import cn from 'classnames';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { Divider } from '@snack-uikit/divider';
import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { TruncateString } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../helpers';
import { Organization, Platform, Project, Workspace } from '../../types';
import { GroupSection, ItemsGroup } from '../GroupSection';
import styles from './styles.modules.scss';

export type SelectProps = {
  organizations?: Organization[];
  selectedOrganization?: Organization;
  onOrganizationChange?(value: Organization): void;
  onOrganizationAdd?(): void;

  projects: ItemsGroup<Project>[];
  selectedProject: Project;
  onProjectChange?(value: Project): void;
  projectAddButton?: {
    onClick(): void;
    tooltip?: string;
    disabled?: boolean;
  };

  platforms: Platform[];
  selectedPlatform: Platform;
  onPlatformChange?(value: Platform): void;

  workspaces?: {
    list: Workspace[];
    selectedWorkspace?: Workspace;
    onWorkspaceChange(value: Workspace): void;
    onWorkspaceAdd(): void;
  };

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

  projectAddButton,

  platforms,
  selectedPlatform,
  onPlatformChange,

  workspaces,

  closeDropdown,

  mobile,
}: SelectMenuProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const className = cn({ [styles.fixedColumnsWidth]: !mobile });

  return (
    <>
      {organizations && (
        <>
          <GroupSection
            className={className}
            title={textProvider(languageCode, Texts.Organization)}
            groups={[{ id: '1', items: organizations }]}
            onItemChange={onOrganizationChange}
            selectedItem={selectedOrganization}
            addItem={{ label: textProvider(languageCode, Texts.AddOrganization), handler: onOrganizationAdd }}
            data-test-id='header__select-group-organization'
          />

          {divider}
        </>
      )}

      <GroupSection
        className={className}
        title={textProvider(languageCode, Texts.Project)}
        searchable
        groups={projects}
        onItemChange={onProjectChange}
        selectedItem={selectedProject}
        addItem={
          projectAddButton && {
            label: textProvider(languageCode, Texts.AddProject),
            handler: projectAddButton.onClick,
            tooltip: projectAddButton.tooltip,
            disabled: projectAddButton.disabled,
          }
        }
        closeDropdown={closeDropdown}
        data-test-id='header__select-group-project'
      />

      {divider}

      <GroupSection
        className={className}
        title={textProvider(languageCode, Texts.Platforms)}
        last={!workspaces}
        groups={[{ id: '1', items: platforms }]}
        onItemChange={onPlatformChange}
        selectedItem={selectedPlatform}
        data-test-id='header__select-group-platform'
      />

      {workspaces && (
        <>
          {divider}

          <GroupSection
            className={className}
            title={textProvider(languageCode, Texts.Workspaces)}
            groups={[{ id: '1', items: workspaces.list }]}
            onItemChange={workspaces.onWorkspaceChange}
            selectedItem={workspaces.selectedWorkspace}
            addItem={{
              label: textProvider(languageCode, Texts.AddWorkspace),
              handler: workspaces.onWorkspaceAdd,
            }}
            data-test-id='header__select-group-workspace'
            searchable
            last
          />
        </>
      )}
    </>
  );
}

const getIcon = (open: boolean) => (open ? <ChevronUpSVG size={16} /> : <ChevronDownSVG size={16} />);

export function SelectMenuTrigger({
  selectedProject,
  open,
  showIcon = true,
}: {
  selectedProject: Project;
  open: boolean;
  showIcon: boolean;
}) {
  return (
    <div className={styles.contentLayout}>
      <Avatar size='xs' name={selectedProject.name} showTwoSymbols shape='square' />

      <span className={styles.project} data-test-id='header__select-project-value'>
        <TruncateString text={selectedProject.name} hideTooltip />
      </span>

      {showIcon && getIcon(open)}
    </div>
  );
}
