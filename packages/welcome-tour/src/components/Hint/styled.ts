import { styled } from '@linaria/react';

import { H4_SEMIBOLD_STYLES, H4_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const HintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-width: 250px;
  max-width: 480px;
  background: var(${COLORS.container.background});
  border-radius: 8px;
`;

export const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Heading = styled.h4`
  ${H4_SEMIBOLD_STYLES};
  color: var(${COLORS.container.heading});
`;

export const SubHeading = styled.h4`
  ${H4_STYLES};
  color: var(${COLORS.container.subheading});
  margin-bottom: 16px;
`;

export const Content = styled.div`
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 8px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StepButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
