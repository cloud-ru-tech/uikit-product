import { useEffect, useState } from 'react';

import { TypographyProps } from '@snack-uikit/typography';

enum breakpoints {
  CAROUSEL_NAVIGATION = 1340,
  XLG = 1280,
  LG = 1052,
  MD = 828,
  SM = 636,
  XSM = 435,
}

export type TypographyFrame = {
  purpose: TypographyProps['purpose'];
  size: TypographyProps['size'];
};

type Frames = {
  desktop: TypographyFrame;
  tablet: TypographyFrame;
  phone?: TypographyFrame;
};

export const useWindowWidth = (options?: { defaultInnerWidth: boolean }) => {
  let stateVariant = undefined;

  if (options?.defaultInnerWidth) stateVariant = typeof window !== 'undefined' ? window.innerWidth : undefined;

  const [windowWidth, setWindowWidth] = useState<number | undefined>(stateVariant);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  const getAdaptiveSizeTypography = (frames: Frames): TypographyFrame => {
    if (windowWidth) {
      if (windowWidth > breakpoints.MD) {
        return frames.desktop;
      }

      if (windowWidth > breakpoints.SM && windowWidth <= breakpoints.MD) {
        return frames.tablet;
      }

      if (windowWidth <= breakpoints.SM) {
        return frames.phone ? frames.phone : frames.tablet;
      }
    }

    return frames.desktop;
  };

  return { windowWidth, breakpoints: breakpoints, getAdaptiveSizeTypography };
};
