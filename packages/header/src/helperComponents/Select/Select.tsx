import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Dropdown } from '@snack-uikit/dropdown';
import { Scroll } from '@snack-uikit/scroll';

import { SelectMenu, SelectMenuTrigger, SelectProps, useProjectsSort } from '../SelectMenu';
import styles from './styles.module.scss';

export function Select({
  organizations,
  selectedOrganization,
  onOrganizationChange,

  projects,
  selectedProject,
  onProjectChange,
  projectAddButton,
  projectsLoading,
  projectsEmptyState,
  onProjectsSortChange,

  platformsFilter,
  onPlatformChange,

  onOpenChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [enableOutsideClick, setEnableOutsideClick] = useState(true);
  const navigateInsideRef = useRef<HTMLDivElement>(null);
  const navigateOutsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openListener = () => {
      setIsOpen(true);
      setEnableOutsideClick(false);
    };

    const closeListener = () => {
      setIsOpen(false);
      setEnableOutsideClick(true);
    };

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

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);

      onOpenChange?.(open);
    },
    [onOpenChange],
  );

  const closeDropdown = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  const { sort, setSort } = useProjectsSort({ projects, selectedOrganization });

  return (
    <Dropdown
      open={isOpen}
      onOpenChange={handleOpenChange}
      outsideClick={enableOutsideClick}
      className={styles.selectWrap}
      content={
        <div className={styles.selectGroup}>
          <Scroll barHideStrategy='never'>
            <div className={styles.selectGroupScroll}>
              <SelectMenu
                organizations={organizations}
                selectedOrganization={selectedOrganization}
                onOrganizationChange={onOrganizationChange}
                projects={projects}
                selectedProject={selectedProject}
                projectsLoading={projectsLoading}
                onProjectChange={onProjectChange}
                projectAddButton={projectAddButton}
                projectsEmptyState={projectsEmptyState}
                onProjectsSortChange={onProjectsSortChange}
                platformsFilter={platformsFilter}
                onPlatformChange={onPlatformChange}
                closeDropdown={closeDropdown}
                mobile={false}
                sort={sort}
                setSort={setSort}
              />
            </div>
          </Scroll>
        </div>
      }
      placement='bottom-start'
      data-test-id='header__select-menu'
      triggerRef={navigateOutsideRef}
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
          open={isOpen}
          showIcon
          loading={projectsLoading}
          nameClassName={styles.name}
          entityClassName={styles.entity}
        />
      </div>
    </Dropdown>
  );
}
