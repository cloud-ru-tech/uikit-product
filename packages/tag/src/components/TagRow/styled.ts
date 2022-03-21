import { styled } from '@linaria/react';

import { Tag } from '../Tag';
import { GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME, TAG_CLOUD_TRIGGER_COLORS } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const TagWrapper = styled.div`
  display: flex;
`;

export const VisibleRow = styled.div`
  column-gap: 4px;
  display: flex;
  flex-wrap: nowrap;
`;

export const HiddenRow = styled(VisibleRow)`
  left: 0;
  position: absolute;
  top: 0;
  visibility: hidden;
  width: 100%;
`;

export const TagCloudTrigger = styled(Tag)`
  margin-left: 4px;

  &:hover {
    background-color: var(${TAG_CLOUD_TRIGGER_COLORS.background.hover});
  }
`;
