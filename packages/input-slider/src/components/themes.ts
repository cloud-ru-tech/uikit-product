import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { WHITE_ALFA, BLACK_ALFA, GREY, PURPLE, GREEN } = EXPORT_VARS;

export const COLORS = {
  border: {
    default: '--color-input-slider__border__default',
    disabled: '--color-input-slider__border__disabled',
    hover: '--color-input-slider__border__hover',
    active: '--color-input-slider__border__active',
  },
  background: {
    default: '--color-input-slider__background__default',
    disabled: '--color-input-slider__background__disabled',
  },
  currency: {
    default: '--color-input-slider__currency__default',
    disabled: '--color-input-slider__currency__disabled',
  },
  delimiter: {
    default: '--color-input-slider__delimiter__default',
    disabled: '--color-input-slider__delimiter__disabled',
  },
  slider: {
    track: {
      default: '--color-input-slider__track__default',
      disabled: '--color-input-slider__track__disabled',
    },
    handle: {
      background: {
        default: '--color-input-slider__handle__default',
        hover: '--color-input-slider__handle__hover',
        active: '--color-input-slider__handle__active',
        disabled: '--color-input-slider__handle__disabled',
      },
      border: {
        hover: '--color-input-slider__handle__border',
        active: '--color-input-slider__handle__border',
      },
    },
    rail: {
      default: '--color-input-slider__rail__default',
      disabled: '--color-input-slider__rail__disabled',
    },
    mark: {
      default: '--color-input-slider__mark__default',
      disabled: '--color-input-slider__mark__disabled',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.border.default}: var(${BLACK_ALFA[16]});
      ${COLORS.border.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.border.hover}: var(${PURPLE[50]});
      ${COLORS.border.active}: var(${PURPLE[100]});

      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.disabled}: var(${BLACK_ALFA[4]});

      ${COLORS.currency.default}: var(${GREY[200]});
      ${COLORS.currency.disabled}: var(${GREY[150]});

      ${COLORS.delimiter.default}: var(${GREY[350]});
      ${COLORS.delimiter.disabled}: var(${GREY[200]});

      ${COLORS.slider.track.default}: var(${PURPLE[100]});
      ${COLORS.slider.track.disabled}: var(${GREY[400]});

      ${COLORS.slider.handle.background.default}: var(${PURPLE[100]});
      ${COLORS.slider.handle.background.hover}: var(${PURPLE[115]});
      ${COLORS.slider.handle.background.active}: var(${PURPLE[125]});
      ${COLORS.slider.handle.background.disabled}: var(${GREY[400]});

      ${COLORS.slider.handle.border.hover}: var(${PURPLE[25]});
      ${COLORS.slider.handle.border.active}: var(${PURPLE[25]});

      ${COLORS.slider.rail.default}: var(${GREY[200]});
      ${COLORS.slider.rail.disabled}: var(${GREY[200]});

      ${COLORS.slider.mark.default}: var(${GREY[800]});
      ${COLORS.slider.mark.disabled}: var(${GREY[200]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.border.default}: var(${BLACK_ALFA[16]});
      ${COLORS.border.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.border.hover}: var(${GREEN[50]});
      ${COLORS.border.active}: var(${GREEN[100]});

      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.disabled}: var(${BLACK_ALFA[4]});

      ${COLORS.currency.default}: var(${GREY[200]});
      ${COLORS.currency.disabled}: var(${GREY[150]});

      ${COLORS.delimiter.default}: var(${GREY[350]});
      ${COLORS.delimiter.disabled}: var(${GREY[200]});

      ${COLORS.slider.track.default}: var(${GREEN[100]});
      ${COLORS.slider.track.disabled}: var(${GREY[400]});

      ${COLORS.slider.handle.background.default}: var(${GREEN[100]});
      ${COLORS.slider.handle.background.hover}: var(${GREEN[115]});
      ${COLORS.slider.handle.background.active}: var(${GREEN[125]});
      ${COLORS.slider.handle.background.disabled}: var(${GREY[400]});

      ${COLORS.slider.handle.border.hover}: var(${GREEN[25]});
      ${COLORS.slider.handle.border.active}: var(${GREEN[25]});

      ${COLORS.slider.rail.default}: var(${GREY[200]});
      ${COLORS.slider.rail.disabled}: var(${GREY[200]});

      ${COLORS.slider.mark.default}: var(${GREY[800]});
      ${COLORS.slider.mark.disabled}: var(${GREY[200]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.border.default}: var(${WHITE_ALFA[24]});
      ${COLORS.border.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.border.hover}: var(${PURPLE[25]});
      ${COLORS.border.active}: var(${PURPLE[50]});

      ${COLORS.background.default}: var(${GREY[800]});
      ${COLORS.background.disabled}: var(${WHITE_ALFA[4]});

      ${COLORS.currency.default}: var(${GREY[450]});
      ${COLORS.currency.disabled}: var(${WHITE_ALFA[16]});

      ${COLORS.delimiter.default}: var(${GREY[500]});
      ${COLORS.delimiter.disabled}: var(${WHITE_ALFA[16]});

      ${COLORS.slider.track.default}: var(${PURPLE[75]});
      ${COLORS.slider.track.disabled}: var(${GREY[450]});

      ${COLORS.slider.handle.background.default}: var(${PURPLE[75]});
      ${COLORS.slider.handle.background.hover}: var(${PURPLE[50]});
      ${COLORS.slider.handle.background.active}: var(${PURPLE[25]});
      ${COLORS.slider.handle.background.disabled}: var(${GREY[450]});

      ${COLORS.slider.handle.border.hover}: var(${PURPLE[100]});
      ${COLORS.slider.handle.border.active}: var(${PURPLE[100]});

      ${COLORS.slider.rail.default}: var(${GREY[600]});
      ${COLORS.slider.rail.disabled}: var(${GREY[600]});

      ${COLORS.slider.mark.default}: var(${GREY[100]});
      ${COLORS.slider.mark.disabled}: var(${WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.border.default}: var(${WHITE_ALFA[24]});
      ${COLORS.border.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.border.hover}: var(${GREEN[25]});
      ${COLORS.border.active}: var(${GREEN[50]});

      ${COLORS.background.default}: var(${GREY[800]});
      ${COLORS.background.disabled}: var(${WHITE_ALFA[4]});

      ${COLORS.currency.default}: var(${GREY[450]});
      ${COLORS.currency.disabled}: var(${WHITE_ALFA[16]});

      ${COLORS.delimiter.default}: var(${GREY[500]});
      ${COLORS.delimiter.disabled}: var(${WHITE_ALFA[16]});

      ${COLORS.slider.track.default}: var(${GREEN[100]});
      ${COLORS.slider.track.disabled}: var(${GREY[450]});

      ${COLORS.slider.handle.background.default}: var(${GREEN[100]});
      ${COLORS.slider.handle.background.hover}: var(${GREEN[75]});
      ${COLORS.slider.handle.background.active}: var(${GREEN[50]});
      ${COLORS.slider.handle.background.disabled}: var(${GREY[450]});

      ${COLORS.slider.handle.border.hover}: var(${GREEN[150]});
      ${COLORS.slider.handle.border.active}: var(${GREEN[150]});

      ${COLORS.slider.rail.default}: var(${GREY[600]});
      ${COLORS.slider.rail.disabled}: var(${GREY[600]});

      ${COLORS.slider.mark.default}: var(${GREY[100]});
      ${COLORS.slider.mark.disabled}: var(${WHITE_ALFA[24]});
    }
  }
`;
