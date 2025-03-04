import { GridProps } from '../components';

export const getColumnsStyles = ({ columnsConfig, layoutType }: Pick<GridProps, 'columnsConfig' | 'layoutType'>) => {
  switch (layoutType) {
    case 'mobile':
      if (columnsConfig.mobile) {
        return {
          '--grid-column-count': columnsConfig.mobile.amount,
          '--grid-item--min-width': `${columnsConfig.mobile.minWidth}px`,
        };
      }
      break;

    case 'tablet':
      if (columnsConfig.tablet) {
        return {
          '--grid-column-count': columnsConfig.tablet.amount,
          '--grid-item--min-width': `${columnsConfig.tablet.minWidth}px`,
        };
      }
      break;

    case 'desktopSmall':
      if (columnsConfig.desktopSmall) {
        return {
          '--grid-column-count': columnsConfig.desktopSmall.amount,
          '--grid-item--min-width': `${columnsConfig.desktopSmall.minWidth}px`,
        };
      }
      if (columnsConfig.desktop) {
        return {
          '--grid-column-count': columnsConfig.desktop.amount,
          '--grid-item--min-width': `${columnsConfig.desktop.minWidth}px`,
        };
      }
      break;

    case 'desktop':
      if (columnsConfig.desktop) {
        return {
          '--grid-column-count': columnsConfig.desktop.amount,
          '--grid-item--min-width': `${columnsConfig.desktop.minWidth}px`,
        };
      }
      break;

    default:
      return undefined;
  }
};
