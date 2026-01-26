import { Meta, StoryObj } from '@storybook/react';

import { themeVars } from '@snack-uikit/figma-tokens';

import { GroupChart } from './components/chart/GroupChart';
import { SingleChart } from './components/chart/SingleChart';
import { PackagesStatistics } from './components/chart/types';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Welcome/Statistics',
};

export default meta;

function Template() {
  const count = process.env.PACKAGES_STATISTICS as unknown as PackagesStatistics;

  return (
    <div>
      <h1 className={styles.title}>Статистика</h1>

      {!count ? (
        <>Не удалось получить данные {'=('}</>
      ) : (
        <div className={styles.chartsWrapper}>
          <SingleChart height={70} value={count.all} total={count.all} title={'Общее количество пакетов'} />

          <GroupChart
            height={80}
            data={[
              {
                title: 'Стабильные',
                value: count.stable,
                color: themeVars.sys.green.accentDefault,
              },
              {
                title: 'Нестабильные',
                value: count.nonStable,
                color: themeVars.sys.red.accentDefault,
              },
            ]}
            title={'Количество пакетов по секциям'}
          />

          <GroupChart
            height={80}
            data={[
              {
                title: 'Публичные',
                value: count.public,
                color: themeVars.sys.primary.accentDefault,
              },
              {
                title: 'Приватные',
                value: count.private,
                color: themeVars.sys.primary.background1Level,
              },
            ]}
            title={'Количество пакетов по типу'}
          />
        </div>
      )}
    </div>
  );
}

export const statistics: StoryObj = {
  render: Template,
};
