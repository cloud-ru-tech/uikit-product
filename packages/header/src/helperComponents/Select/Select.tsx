import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Dropdown } from '@snack-uikit/dropdown';

import { Workspace } from '../../types';
import { SelectMenu, SelectMenuTrigger, SelectProps } from '../SelectMenu';
import styles from './styles.modules.scss';

export function Select({
  organizations: organizationsProp,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd: onOrganizationAddProp,

  projects,
  selectedProject,
  onProjectChange,
  projectAddButton: projectAddButtonProp,
  projectsLoading,

  platforms: platformsProp,
  selectedPlatform,
  onPlatformChange,
  platformsLoading,

  workspaces,

  onClose,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigateInsideRef = useRef<HTMLDivElement>(null);
  const navigateOutsideRef = useRef<HTMLDivElement>(null);

  const organizations = useMemo(() => organizationsProp?.filter(org => !org.new), [organizationsProp]);

  const platforms = useMemo(() => platformsProp?.filter(platform => !platform.hidden), [platformsProp]);

  useEffect(() => {
    const openListener = () => setIsOpen(true);
    const closeListener = () => setIsOpen(false);

    window.addEventListener('header__open-project-menu', openListener);
    window.addEventListener('header__close-project-menu', closeListener);

    return () => {
      window.removeEventListener('header__open-project-menu', openListener);
      window.removeEventListener('header__close-project-menu', closeListener);
    };
  }, []);

  const handleSelectKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setIsOpen(true);
      setTimeout(() => navigateInsideRef.current?.focus(), 0);
    }
  };

  const toggleOpen = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      onClose?.();
    }
  };

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

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
            onWorkspaceChange(value: Workspace) {
              closeDropdown();
              workspaces?.onWorkspaceChange(value);
            },
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
      onOpenChange={toggleOpen}
      content={
        <div className={styles.selectGroup}>
          <SelectMenu
            organizations={organizations}
            selectedOrganization={selectedOrganization}
            onOrganizationChange={onOrganizationChange}
            onOrganizationAdd={onOrganizationAdd}
            projects={projects}
            selectedProject={selectedProject}
            projectsLoading={projectsLoading}
            onProjectChange={onProjectChange}
            projectAddButton={projectAddButton}
            platforms={platforms}
            selectedPlatform={selectedPlatform}
            platformsLoading={platformsLoading}
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
        <SelectMenuTrigger
          selectedProject={selectedProject}
          selectedWorkspace={workspaces?.selectedWorkspace}
          open={isOpen}
          showIcon
        />
      </div>
    </Dropdown>
  );
}
