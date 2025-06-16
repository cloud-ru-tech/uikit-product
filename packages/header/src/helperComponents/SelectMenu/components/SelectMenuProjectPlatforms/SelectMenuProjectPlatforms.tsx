import { ButtonFunction } from '@snack-uikit/button';
import { WithTooltip } from '@snack-uikit/tooltip';

import { Project, ProjectPlatform } from '../../../../types';
import { stopPropagationClick } from '../../../../utils';
import styles from './styles.module.scss';

export type SelectMenuProjectPlatformsProps = {
  platforms: ProjectPlatform[];
  onPlatformChange(params: { platform: ProjectPlatform; project: Project }): void;
  project: Project;
};

export function SelectMenuProjectPlatforms({ platforms, onPlatformChange, project }: SelectMenuProjectPlatformsProps) {
  return platforms.map(platform => (
    // div нужен для превента onMouseDown, в ButtonFunction нет такого пропа
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div key={platform.id} className={styles.platform} onMouseDown={stopPropagationClick}>
      <WithTooltip tooltip={{ tip: platform.tip }}>
        <ButtonFunction
          size='xs'
          icon={platform.icon}
          appearance='neutral'
          data-test-id='header__select-project__platform-button'
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            onPlatformChange({ platform, project });
          }}
        />
      </WithTooltip>
    </div>
  ));
}
