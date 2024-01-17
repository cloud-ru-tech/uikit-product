import { KeyboardEvent, ReactElement, useRef, useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { Dropdown } from '@snack-uikit/droplist';
import { TruncateString } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../../../helpers';
import { SelectGroupSection } from '../SelectGroupSection';
import styles from './styles.modules.scss';

type Organization = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
  onEdit?(): void;
};

type Platform = {
  id: string;
  name: string;
  logo: ReactElement;
};

type ItemsGroup<T> = {
  id: string;
  heading?: string;
  items: T[];
};

export type SelectProps = {
  open?: boolean;
  onOpenChange?(value: boolean): void;

  organizations: Organization[];
  selectedOrganization: Organization;
  onOrganizationChange?(value: Organization): void;
  onOrganizationAdd?(): void;

  projects: ItemsGroup<Project>[];
  selectedProject: Project;
  onProjectChange?(value: Project): void;
  onProjectAdd?(): void;

  platforms: Platform[];
  selectedPlatform: Platform;
  onPlatformChange?(value: Platform): void;

  separator?: string;
};

export function Select({
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd,

  projects,
  selectedProject,
  onProjectChange,
  onProjectAdd,

  platforms,
  selectedPlatform,
  onPlatformChange,

  separator = '/',
}: SelectProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [isOpen, setIsOpen] = useState(false);
  const navigateInsideRef = useRef<HTMLDivElement>(null);
  const navigateOutsideRef = useRef<HTMLDivElement>(null);

  const handleSelectKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setIsOpen(true);
      setTimeout(() => navigateInsideRef.current?.focus(), 0);
    }
  };

  return (
    <Dropdown
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <div className={styles.selectGroup}>
          <SelectGroupSection
            navigateOutsideRef={navigateOutsideRef}
            navigateInsideRef={navigateInsideRef}
            title={textProvider(languageCode, Texts.Organization)}
            groups={[{ id: '1', items: organizations }]}
            onItemChange={onOrganizationChange}
            selectedItem={selectedOrganization}
            addItem={{ label: textProvider(languageCode, Texts.AddOrganization), handler: onOrganizationAdd }}
          />

          <SelectGroupSection
            title={textProvider(languageCode, Texts.Project)}
            searchable={true}
            groups={projects}
            onItemChange={onProjectChange}
            selectedItem={selectedProject}
            addItem={{ label: textProvider(languageCode, Texts.AddProject), handler: onProjectAdd }}
          />

          <SelectGroupSection
            title={textProvider(languageCode, Texts.Platforms)}
            last={true}
            groups={[{ id: '1', items: platforms }]}
            onItemChange={onPlatformChange}
            selectedItem={selectedPlatform}
          />
        </div>
      }
      placement='bottom-start'
    >
      <div
        className={styles.select}
        tabIndex={0}
        role={'menu'}
        data-open={isOpen || undefined}
        ref={navigateOutsideRef}
        onKeyDown={handleSelectKeyDown}
      >
        <div className={styles.contentLayout}>
          <Avatar size='xs' name={selectedProject.name} showTwoSymbols shape='square' />

          <span className={styles.project}>
            <TruncateString text={selectedProject.name} hideTooltip />
          </span>
        </div>

        <span className={styles.separator}>{separator}</span>

        <div className={styles.contentLayout}>
          {selectedPlatform.logo}

          <span className={styles.platform}>
            <TruncateString text={selectedPlatform.name} hideTooltip />
          </span>
        </div>
      </div>
    </Dropdown>
  );
}
