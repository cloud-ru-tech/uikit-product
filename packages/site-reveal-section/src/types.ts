import type { CSSProperties, HTMLAttributes } from 'react';

export type RevealAnimationOptions = {
  disabled?: boolean;
  duration?: number;
  delay?: number;
  offset?: number;
  easing?: CSSProperties['transitionTimingFunction'];
  rootMargin?: IntersectionObserverInit['rootMargin'];
  threshold?: IntersectionObserverInit['threshold'];
};

export type RevealSectionProps = HTMLAttributes<HTMLDivElement> & RevealAnimationOptions;
