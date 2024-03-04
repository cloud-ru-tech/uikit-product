import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Dropdown } from '@snack-uikit/dropdown';

import { SelectMenu, SelectMenuTrigger, SelectProps } from '../SelectMenu';
import styles from './styles.modules.scss';

export function Select({
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd: onOrganizationAddProp,

  projects,
  selectedProject,
  onProjectChange,
  projectAddButton: projectAddButtonProp,

  platforms,
  selectedPlatform,
  onPlatformChange,

  workspaces,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigateInsideRef = useRef<HTMLDivElement>(null);
  const navigateOutsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = () => setIsOpen(true);

    window.addEventListener('header__open-project-menu', listener);

    return () => {
      window.removeEventListener('header__open-project-menu', listener);
    };
  }, []);

  const handleSelectKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setIsOpen(true);
      setTimeout(() => navigateInsideRef.current?.focus(), 0);
    }
  };

  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const onOrganizationAdd = useMemo(() => {
    if (onOrganizationAddProp) {
      return () => {
        closeDropdown();
        onOrganizationAddProp();
      };
    }

    return undefined;
  }, [closeDropdown, onOrganizationAddProp]);

  const projectAddButton = useMemo(() => {
    if (projectAddButtonProp) {
      return {
        ...projectAddButtonProp,
        onClick() {
          closeDropdown();
          projectAddButtonProp.onClick();
        },
      };
    }

    return undefined;
  }, [closeDropdown, projectAddButtonProp]);

  const workspacesOptions = useMemo(
    () =>
      workspaces
        ? {
            ...workspaces,
            onWorkspaceAdd() {
              closeDropdown();
              workspaces.onWorkspaceAdd();
            },
          }
        : undefined,
    [closeDropdown, workspaces],
  );

  return (
    <Dropdown
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <div className={styles.selectGroup}>
          <SelectMenu
            organizations={organizations}
            selectedOrganization={selectedOrganization}
            onOrganizationChange={onOrganizationChange}
            onOrganizationAdd={onOrganizationAdd}
            projects={projects ?? []}
            selectedProject={selectedProject}
            onProjectChange={onProjectChange}
            projectAddButton={projectAddButton}
            platforms={platforms ?? []}
            selectedPlatform={selectedPlatform}
            onPlatformChange={onPlatformChange}
            closeDropdown={closeDropdown}
            workspaces={workspacesOptions}
            mobile={false}
          />
        </div>
      }
      placement='bottom-start'
      data-test-id='header__select-menu'
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
        <SelectMenuTrigger selectedProject={selectedProject} open={isOpen} showIcon />
      </div>
    </Dropdown>
  );
}
