import { css } from '@linaria/core';
import { COLORS_GENERAL } from './color/vars';

export const globals = css`
  :global() {
    @font-face {
      font-family: 'SB Sans Interface';
      src: url('./fonts/SBSansInterface-Semibold.woff2') format('woff2'),
        url('./fonts/SBSansInterface-Semibold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'SB Sans Interface';
      src: url('./fonts/SBSansInterface-Light.woff2') format('woff2'),
        url('./fonts/SBSansInterface-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'SB Sans Interface';
      src: url('./fonts/SBSansInterface-Bold.woff2') format('woff2'),
        url('./fonts/SBSansInterface-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'SB Sans Interface Caps';
      src: url('./fonts/SBSansInterface-Caps.woff2') format('woff2'),
        url('./fonts/SBSansInterface-Caps.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'SB Sans Interface';
      src: url('./fonts/SBSansInterface-Regular.woff2') format('woff2'),
        url('./fonts/SBSansInterface-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    html {
      height: 100%;
    }

    body {
      height: 100%;
      background: var(${COLORS_GENERAL.BACKGROUND});

      transition: all 0.4s ease-in-out;
    }

    body,
    button,
    input {
      font-family: SB Sans Interface, Helvetica, Arial, sans-serif;
      color: var(${COLORS_GENERAL.TEXT});
    }

    a {
      text-decoration: none;
    }
  }
`;
