import { GridProps } from '../components';

export const getColumnsStyles = ({ columnsConfig, layoutType }: Pick<GridProps, 'columnsConfig' | 'layoutType'>) => {
  switch (layoutType) {
    case 'mobile':
      if (columnsConfig.mobile) {
        return {
          gridTemplateColumns: `repeat(${columnsConfig.mobile.amount}, minmax(${columnsConfig.mobile.minWidth}px, 1fr))`,
        };
      }
      break;

    case 'tablet':
      if (columnsConfig.tablet) {
        return {
          gridTemplateColumns: `repeat(${columnsConfig.tablet.amount}, minmax(${columnsConfig.tablet.minWidth}px, 1fr))`,
        };
      }
      break;

    case 'desktopSmall':
      if (columnsConfig.desktopSmall) {
        return {
          gridTemplateColumns: `repeat(${columnsConfig.desktopSmall.amount}, minmax(${columnsConfig.desktopSmall.minWidth}px, 1fr))`,
        };
      }
      if (columnsConfig.desktop) {
        return {
          gridTemplateColumns: `repeat(${columnsConfig.desktop.amount}, minmax(${columnsConfig.desktop.minWidth}px, 1fr))`,
        };
      }
      break;

    case 'desktop':
      if (columnsConfig.desktop) {
        return {
          gridTemplateColumns: `repeat(${columnsConfig.desktop.amount}, minmax(${columnsConfig.desktop.minWidth}px, 1fr))`,
        };
      }
      break;

    default:
      return undefined;
  }
};
