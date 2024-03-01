import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { Divider } from '@snack-uikit/divider';
import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { TruncateString } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../helpers';
import { Organization, Platform, Project } from '../../types';
import { GroupSection, ItemsGroup } from '../GroupSection';
import styles from './styles.modules.scss';

export type SelectProps = {
  organizations: Organization[];
  selectedOrganization: Organization;
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

  closeDropdown?(): void;
};

const divider = (
  <div>
    <Divider orientation='vertical' />
  </div>
);

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

  closeDropdown,
}: SelectProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <div className={styles.selectGroup}>
      <GroupSection
        className={styles.section}
        title={textProvider(languageCode, Texts.Organization)}
        groups={[{ id: '1', items: organizations }]}
        onItemChange={onOrganizationChange}
        selectedItem={selectedOrganization}
        addItem={{ label: textProvider(languageCode, Texts.AddOrganization), handler: onOrganizationAdd }}
        data-test-id='header__select-group-organization'
      />

      {divider}

      <GroupSection
        className={styles.section}
        title={textProvider(languageCode, Texts.Project)}
        searchable={true}
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
        className={styles.section}
        title={textProvider(languageCode, Texts.Platforms)}
        last={true}
        groups={[{ id: '1', items: platforms }]}
        onItemChange={onPlatformChange}
        selectedItem={selectedPlatform}
        data-test-id='header__select-group-platform'
      />
    </div>
  );
}

export function SelectMenuTrigger({ selectedProject, open }: { selectedProject: Project; open: boolean }) {
  return (
    <div className={styles.contentLayout}>
      <Avatar size='xs' name={selectedProject.name} showTwoSymbols shape='square' />

      <span className={styles.project} data-test-id='header__select-project-value'>
        <TruncateString text={selectedProject.name} hideTooltip />
      </span>

      {open ? <ChevronUpSVG size={16} /> : <ChevronDownSVG size={16} />}
    </div>
  );
}
