import { styled } from '@linaria/react';
import { getStorybook } from '@storybook/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useMemo } from 'react';

import { H2_STYLES } from '@sbercloud/uikit-product-typography';

import { GroupChart } from '../src/chart/GroupChart';
import { SingleChart } from '../src/chart/SingleChart';
import { getRandomColor, getStatisticsData } from '../src/helper';
import { ChartData, PackageNames } from '../src/types';

export default {
  title: 'Welcome/Statistics',
} as Meta;

const ChartsWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 500px);
  grid-auto-rows: 400px;
`;

const Title = styled.h1`
  ${H2_STYLES};
  margin-bottom: 60px;
`;

const Template: Story = () => {
  const storybook = getStorybook();
  const { stories, packages } = getStatisticsData(storybook);

  const storiesData = useMemo(() => {
    const data: ChartData[] = [];
    const allStories: string[] = [];

    Object.entries(stories)
      .filter(([key]) => key !== PackageNames.Welcome)
      .map(([key, value]) => {
        data.push({
          title: key,
          value: Object.keys(value).length,
          color: getRandomColor(),
        });

        allStories.push(...Object.values(value));
      });

    return { data, count: allStories.length };
  }, [stories]);

  const packagesData = useMemo(() => {
    const data: ChartData[] = [];
    const packagesWithStories: Record<string, string[]> = {};

    Object.entries(packages)
      .filter(([key]) => key !== PackageNames.Welcome)
      .map(([key, value]) => {
        data.push({
          title: key,
          value: Object.keys(value).length,
          color: getRandomColor(),
        });

        Object.entries(value).map(([key, value]) => {
          packagesWithStories[key] = packagesWithStories[key] ? [...packagesWithStories[key], ...value] : [...value];
        });
      });

    const storiesByPackage = Object.entries(packagesWithStories).map(([key, value]) => ({
      title: key,
      value: value.length,
      color: getRandomColor(),
    }));

    return { data, count: storiesByPackage.length };
  }, [packages]);

  return (
    <div>
      <Title>Статистика</Title>
      <ChartsWrapper>
        <GroupChart height={80} data={packagesData.data} title={'Количество пакетов по секциям'} />
        <SingleChart
          height={70}
          value={packagesData.count}
          total={packagesData.count}
          title={'Общее количество пакетов'}
        />
        <GroupChart height={80} data={storiesData.data} title={'Количество stories по секциям'} />
        <SingleChart
          height={70}
          value={storiesData.count}
          total={storiesData.count}
          title={'Общее количество stories'}
        />
      </ChartsWrapper>
    </div>
  );
};

export const statistics = Template.bind({});
statistics.args = {};
statistics.argTypes = {};
