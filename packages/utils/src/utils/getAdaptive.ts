import { AdaptiveQueriesTitle } from '../constants/adaptive';
import { LayoutType, MatchMediaGeneric } from '../types/adaptive';
import { getUserAgentInfo } from './getUserAgentInfo';

export function getAdaptive({ isMobile, isTablet }: MatchMediaGeneric<AdaptiveQueriesTitle>) {
  const { device } = getUserAgentInfo();

  let layoutType: LayoutType;

  switch (device.type) {
    case 'mobile':
      layoutType = 'mobile';
      break;
    case 'tablet':
      layoutType = isMobile || isTablet ? 'mobile' : 'tablet';
      break;
    default:
      layoutType = isMobile ? 'desktopSmall' : 'desktop';
      break;
  }

  return { layoutType };
}
