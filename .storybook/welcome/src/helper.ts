import { IStorybookSection } from '@storybook/addons';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

type ReturnStatisticsData = {
  stories: Record<string, string>;
  packages: Record<string, Record<string, string[]>>;
};

export const getStatisticsData = (d: IStorybookSection[]): ReturnStatisticsData => {
  try {
    const stories = {};
    const packages = {};

    d.forEach(s => {
      const sectionName = s.kind.split('/')[0];
      const packageName = s.kind.split('/')[1];
      const storiesName = s.kind.split('/')[2] || packageName;

      packages[sectionName] = {
        ...packages[sectionName],
        [packageName]: packages[sectionName]?.[packageName]
          ? [...packages[sectionName][packageName], storiesName]
          : [storiesName],
      };

      stories[sectionName] = stories[sectionName] ? [...stories[sectionName], s.stories[0].name] : [s.stories[0].name];
    });

    return { stories, packages };
  } catch (e) {
    return { stories: {}, packages: {} };
  }
};

const { PURPLE, BERRY_RED, GREEN } = EXPORT_VARS;

const getColorValues = (colors: Record<string, string>[]) =>
  colors
    .map(c => Object.values(c).slice(3, Object.values(c).length - 3))
    .flat()
    .sort();

export const CHART_COLORS = [...getColorValues([PURPLE, BERRY_RED, GREEN])];

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const getRandomColor = () => `var(${CHART_COLORS[getRandomInt(CHART_COLORS.length)]})`;
