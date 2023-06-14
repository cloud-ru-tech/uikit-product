import { styled } from '@linaria/react';

import { H2_STYLES, H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_DARK_THEME;
PURPLE_THEME;

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 1200px;
`;

export const BaseBlock = styled.div`
  padding: 80px 0;
  background: var(${COLORS.NO_ACCESS_PAGE.BACKGROUND});
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ServiceName = styled.div`
  ${H2_STYLES};
  display: block;
  margin-bottom: 24px;
  color: var(${COLORS.NO_ACCESS_PAGE.TITLE});
`;

export const H5Heading = styled.div`
  ${H5_STYLES};
  margin-top: 20px;
  text-align: center;
  color: var(${COLORS.NO_ACCESS_PAGE.TITLE});
`;

export const Description = styled.div`
  margin-top: 8px;
  max-width: 500px;
`;

export const Text = styled.div`
  ${TEXT_2_STYLES};
  display: block;
  text-align: center;
  white-space: break-spaces;
  color: var(${COLORS.NO_ACCESS_PAGE.TEXT});
`;
