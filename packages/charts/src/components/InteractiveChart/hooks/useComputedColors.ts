import { useState } from 'react';

import { useTheme } from '@sbercloud/uikit-product-utils';
import { useLayoutEffect } from '@snack-uikit/utils';

import { COLOR_CONTAINER_CLASSNAME, OTHER_COLORS, SERIES_COLORS, SeriesColorMap } from '../../../constants/colors';

const EMPTY_COLORS = {};

export function useComputedColors() {
  const { theme } = useTheme();
  const [computedColors, setComputedColors] = useState<SeriesColorMap>(EMPTY_COLORS);

  useLayoutEffect(() => {
    const colorContainer = document.querySelector('.' + COLOR_CONTAINER_CLASSNAME);

    if (!colorContainer) {
      return;
    }

    const styles = getComputedStyle(colorContainer);

    setComputedColors(
      Object.values({ ...SERIES_COLORS, ...OTHER_COLORS }).reduce((colors, color) => {
        colors[color] = styles.getPropertyValue(`--${color}`);
        return colors;
      }, {} as SeriesColorMap),
    );
  }, [theme]);

  return computedColors;
}
