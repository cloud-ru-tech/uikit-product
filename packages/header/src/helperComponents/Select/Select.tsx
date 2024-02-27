import { KeyboardEvent, useRef, useState } from 'react';

import { Dropdown } from '@snack-uikit/droplist';

import { Platform, ProductOption } from '../../types';
import { SelectMenu, SelectMenuTrigger, SelectProps } from '../SelectMenu';
import styles from './styles.modules.scss';

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
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigateInsideRef = useRef<HTMLDivElement>(null);
  const navigateOutsideRef = useRef<HTMLDivElement>(null);

  const handleSelectKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setIsOpen(true);
      setTimeout(() => navigateInsideRef.current?.focus(), 0);
    }
  };

  const closeDropdown = () => setIsOpen(false);

  return (
    <Dropdown
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <SelectMenu
          organizations={organizations}
          selectedOrganization={selectedOrganization}
          onOrganizationChange={onOrganizationChange}
          onOrganizationAdd={onOrganizationAdd}
          projects={projects ?? []}
          selectedProject={selectedProject ?? ({} as ProductOption)}
          onProjectChange={onProjectChange}
          onProjectAdd={onProjectAdd}
          platforms={platforms ?? []}
          selectedPlatform={selectedPlatform ?? ({} as Platform)}
          onPlatformChange={onPlatformChange}
          closeDropdown={closeDropdown}
        />
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
        data-test-id='header__select'
      >
        <SelectMenuTrigger selectedProject={selectedProject} open={isOpen} />
      </div>
    </Dropdown>
  );
}
