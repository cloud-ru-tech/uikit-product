import { useMemo } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { GroupItemProps } from '@snack-uikit/list';

import { Project } from '../../../../types';
import { ItemDroplist } from '../../../ItemDroplist';
import { SelectMenuProjectPlatforms, SelectMenuProjectPlatformsProps } from '../SelectMenuProjectPlatforms';

type ProjectAfterContentProps = Pick<SelectMenuProjectPlatformsProps, 'onPlatformChange'> & {
  mobile: boolean;
  closeDropdown?(): void;
  dataTestId: string;
  project: Project;
};

export function ProjectAfterContent({
  project,
  onPlatformChange,
  closeDropdown,
  dataTestId,
  mobile,
}: ProjectAfterContentProps) {
  const { t } = useLocale('Header');

  const filteredPlatforms = useMemo(() => project.platforms?.filter(platform => !platform.hidden), [project.platforms]);

  const pinTop = useMemo<GroupItemProps[] | undefined>(() => {
    if (!filteredPlatforms?.length) {
      return undefined;
    }

    return [
      {
        type: 'group',
        label: t('platforms'),
        items: filteredPlatforms?.map(platform => ({
          id: platform.id,
          content: {
            option: platform.label,
          },
          beforeContent: platform.icon,
          onClick() {
            onPlatformChange?.({ project, platform });
          },
        })),
      },
    ];
  }, [filteredPlatforms, onPlatformChange, project, t]);

  if (mobile) {
    const hasActions = project.actions && project.actions.length > 0;

    return (
      (pinTop || hasActions) && (
        <ItemDroplist
          actions={(project.actions?.length ? project.actions : pinTop) ?? []}
          dataTestId={dataTestId}
          onItemClick={closeDropdown}
          pinTop={hasActions ? pinTop : undefined}
        />
      )
    );
  }

  return (
    <>
      {filteredPlatforms && filteredPlatforms.length > 0 && (
        <SelectMenuProjectPlatforms
          platforms={filteredPlatforms}
          onPlatformChange={params => {
            onPlatformChange(params);
            closeDropdown?.();
          }}
          project={project}
        />
      )}

      {project.actions && project.actions.length > 0 && (
        <ItemDroplist actions={project.actions} dataTestId={dataTestId} onItemClick={closeDropdown} />
      )}
    </>
  );
}
