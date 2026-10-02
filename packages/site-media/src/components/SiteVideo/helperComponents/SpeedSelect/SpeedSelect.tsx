import { FocusEvent, useMemo, useState } from 'react';
import type Player from 'video.js/dist/types/player';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { BaseItemProps, List } from '@snack-uikit/list';
import { Tooltip } from '@snack-uikit/tooltip';

import { PLAYBACK_RATES } from '../../constants';
import { formatRate } from '../../utils';
import styles from './styles.module.scss';

type SpeedSelectProps = WithLayoutType<{
  player: Player;
  rate: number;
}>;

export function SpeedSelect({ player, rate, layoutType }: SpeedSelectProps) {
  const { t } = useLocale('SiteMedia');
  const [isOpen, setIsOpen] = useState(false);

  const items: BaseItemProps[] = useMemo(
    () =>
      PLAYBACK_RATES.map(item => ({
        id: item,
        content: { option: formatRate(item) },
        onClick: () => {
          player.playbackRate(item);
          setIsOpen(false);
        },
      })),
    [player],
  );

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.root} data-layout-type={layoutType} onBlur={handleBlur}>
      <Tooltip tip={t('Video.speed')} open={isOpen ? false : undefined} disableMaxWidth>
        <ButtonFunction
          size='xs'
          label={formatRate(rate)}
          aria-label={t('Video.speed')}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(prev => !prev)}
        />
      </Tooltip>
      {isOpen && (
        <div className={styles.menu}>
          <List items={items} size='m' marker selection={{ mode: 'single', value: rate }} />
        </div>
      )}
    </div>
  );
}
