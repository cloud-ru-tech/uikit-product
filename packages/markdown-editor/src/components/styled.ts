import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { H3_SEMIBOLD_STYLES, H4_SEMIBOLD_STYLES, H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const MarkdownViewerWrapper = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

export const markdownViewerClassName = css`
  margin: 0;
  width: 100%;
  overflow: auto;
  color: var(${COLORS.COLOR_DEFAULT});

  & > * {
    margin: 12px 0 !important;
  }

  & > *:first-child {
    margin-top: 0 !important;
  }

  & > *:last-child {
    margin-bottom: 0 !important;
  }

  & pre {
    border-radius: 0 !important;
  }

  img {
    border-style: none;
    max-width: 100%;
    box-sizing: content-box;
    background-color: var(${COLORS.BACKGROUND_DEFAULT});
  }

  h1 {
    ${H3_SEMIBOLD_STYLES};
  }

  h2 {
    ${H4_SEMIBOLD_STYLES};
  }

  h3,
  h4,
  h5 {
    ${H5_STYLES};
  }

  h6 {
    ${TEXT_2_STYLES};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 32px 0 16px;
  }

  p {
    ${TEXT_2_STYLES};
    margin: 0;
  }

  li {
    ${TEXT_2_STYLES};
  }

  ul,
  ol {
    padding-inline-start: 24px;
  }

  ul {
    & > li {
      list-style-type: disc;
    }
  }

  ol {
    & > li {
      list-style-type: decimal;
    }
  }
`;
