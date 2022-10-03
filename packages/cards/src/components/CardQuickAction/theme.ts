import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';
import { SHADOW } from '@sbercloud/uikit-product-utils';

const { GREY, WHITE_ALFA, PURPLE, GREEN, PURPLE_ALFA, GREEN_ALFA, BLUE_GREY, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: {
    primary: {
      default: '--color__cards__card-quick-action__background__primary__default',
      hover: '--color__cards__card-quick-action__background__primary__hover',
      active: '--color__cards__card-quick-action__background__primary__active',
      shadow: {
        default: '--color__cards__card-quick-action__background__primary__shadow__default',
        hover: '--color__cards__card-quick-action__background__primary__shadow__hover',
        active: '--color__cards__card-quick-action__background__primary__shadow__active',
      },
    },
    accent: {
      default: '--color__cards__card-quick-action__background__accent__default',
      hover: '--color__cards__card-quick-action__background__accent__hover',
      active: '--color__cards__card-quick-action__background__accent__active',
    },
  },
  description: {
    primary: '--color__cards__card-quick-action__description__primary',
    accent: '--color__cards__card-quick-action__description__accent',
  },
  image: {
    primary: {
      icon: '--color__cards__card-quick-action__image__primary__icon',
      background: '--color__cards__card-quick-action__image__primary__background',
    },
    accent: {
      icon: '--color__cards__card-quick-action__image__accent__icon',
      background: '--color__cards__card-quick-action__image__accent__background',
    },
  },
  title: {
    primary: {
      default: '--color__cards__card-quick-action__title__primary__default',
      hover: '--color__cards__card-quick-action__title__primary__hover',
      active: '--color__cards__card-quick-action__title__primary__active',
    },
    accent: {
      default: '--color__cards__card-quick-action__title__accent__default',
      hover: '--color__cards__card-quick-action__title__accent__hover',
      active: '--color__cards__card-quick-action__title__accent__active',
    },
  },
  plus: {
    primary: {
      default: '--color__cards__card-quick-action__plus__primary__default',
      hover: '--color__cards__card-quick-action__plus__primary__hover',
      active: '--color__cards__card-quick-action__plus__primary__active',
    },
    accent: {
      default: '--color__cards__card-quick-action__plus__accent__default',
      hover: '--color__cards__card-quick-action__plus__accent__hover',
      active: '--color__cards__card-quick-action__plus__accent__active',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background.primary.default}: var(${GREY[0]});
      ${COLORS.background.primary.hover}: var(${GREY[0]});
      ${COLORS.background.primary.active}: var(${GREY[0]});

      ${COLORS.background.primary.shadow.default}: none;
      ${COLORS.background.primary.shadow.hover}: ${SHADOW.MEDIUM};
      ${COLORS.background.primary.shadow.active}: ${SHADOW.LARGE};

      ${COLORS.background.accent.default}: var(${PURPLE[100]});
      ${COLORS.background.accent.hover}: var(${PURPLE[115]});
      ${COLORS.background.accent.active}: var(${PURPLE[125]});

      ${COLORS.title.primary.default}: var(${GREY[800]});
      ${COLORS.title.primary.hover}: var(${PURPLE[100]});
      ${COLORS.title.primary.active}: var(${PURPLE[115]});

      ${COLORS.title.accent.default}: var(${GREY[0]});
      ${COLORS.title.accent.hover}: var(${GREY[0]});
      ${COLORS.title.accent.active}: var(${GREY[0]});

      ${COLORS.description.primary}: var(${GREY[600]});
      ${COLORS.description.accent}: var(${GREY[0]});

      ${COLORS.image.primary.icon}: var(${PURPLE[100]});
      ${COLORS.image.primary.background}: var(${PURPLE_ALFA[8]});

      ${COLORS.image.accent.icon}: var(${GREY[0]});
      ${COLORS.image.accent.background}: var(${WHITE_ALFA[8]});

      ${COLORS.plus.primary.default}: var(${GREY[800]});
      ${COLORS.plus.primary.hover}: var(${PURPLE[100]});
      ${COLORS.plus.primary.active}: var(${PURPLE[115]});

      ${COLORS.plus.accent.default}: var(${GREY[0]});
      ${COLORS.plus.accent.hover}: var(${GREY[0]});
      ${COLORS.plus.accent.active}: var(${GREY[0]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background.primary.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.primary.hover}: var(${WHITE_ALFA[16]});
      ${COLORS.background.primary.active}: var(${WHITE_ALFA[24]});

      ${COLORS.background.primary.shadow.default}: none;
      ${COLORS.background.primary.shadow.hover}: none;
      ${COLORS.background.primary.shadow.active}: none;

      ${COLORS.background.accent.default}: var(${PURPLE[100]});
      ${COLORS.background.accent.hover}: var(${PURPLE[115]});
      ${COLORS.background.accent.active}: var(${PURPLE[125]});

      ${COLORS.title.primary.default}: var(${GREY[100]});
      ${COLORS.title.primary.hover}: var(${PURPLE[25]});
      ${COLORS.title.primary.active}: var(${PURPLE[50]});

      ${COLORS.title.accent.default}: var(${GREY[0]});
      ${COLORS.title.accent.hover}: var(${GREY[0]});
      ${COLORS.title.accent.active}: var(${GREY[0]});

      ${COLORS.description.primary}: var(${GREY[300]});
      ${COLORS.description.accent}: var(${GREY[0]});

      ${COLORS.image.primary.icon}: var(${PURPLE[25]});
      ${COLORS.image.primary.background}: var(${PURPLE_ALFA[24]});

      ${COLORS.image.accent.icon}: var(${GREY[0]});
      ${COLORS.image.accent.background}: var(${WHITE_ALFA[8]});

      ${COLORS.plus.primary.default}: var(${GREY[100]});
      ${COLORS.plus.primary.hover}: var(${PURPLE[25]});
      ${COLORS.plus.primary.active}: var(${PURPLE[50]});

      ${COLORS.plus.accent.default}: var(${GREY[0]});
      ${COLORS.plus.accent.hover}: var(${GREY[0]});
      ${COLORS.plus.accent.active}: var(${GREY[0]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background.primary.default}: var(${GREY[0]});
      ${COLORS.background.primary.hover}: var(${GREY[0]});
      ${COLORS.background.primary.active}: var(${GREY[0]});

      ${COLORS.background.primary.shadow.default}: none;
      ${COLORS.background.primary.shadow.hover}: ${SHADOW.MEDIUM};
      ${COLORS.background.primary.shadow.active}: ${SHADOW.LARGE};

      ${COLORS.background.accent.default}: var(${BLUE_GREY[80]});
      ${COLORS.background.accent.hover}: var(${BLUE_GREY[90]});
      ${COLORS.background.accent.active}: var(${BLUE_GREY[100]});

      ${COLORS.title.primary.default}: var(${GREY[800]});
      ${COLORS.title.primary.hover}: var(${GREEN[100]});
      ${COLORS.title.primary.active}: var(${GREEN[115]});

      ${COLORS.title.accent.default}: var(${GREY[0]});
      ${COLORS.title.accent.hover}: var(${GREY[0]});
      ${COLORS.title.accent.active}: var(${GREY[0]});

      ${COLORS.description.primary}: var(${GREY[600]});
      ${COLORS.description.accent}: var(${GREY[0]});

      ${COLORS.image.primary.icon}: var(${GREEN[100]});
      ${COLORS.image.primary.background}: var(${GREEN_ALFA[8]});

      ${COLORS.image.accent.icon}: var(${GREY[0]});
      ${COLORS.image.accent.background}: var(${WHITE_ALFA[8]});

      ${COLORS.plus.primary.default}: var(${GREY[800]});
      ${COLORS.plus.primary.hover}: var(${GREEN[100]});
      ${COLORS.plus.primary.active}: var(${GREEN[115]});

      ${COLORS.plus.accent.default}: var(${GREY[0]});
      ${COLORS.plus.accent.hover}: var(${GREY[0]});
      ${COLORS.plus.accent.active}: var(${GREY[0]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background.primary.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.primary.hover}: var(${WHITE_ALFA[16]});
      ${COLORS.background.primary.active}: var(${WHITE_ALFA[24]});

      ${COLORS.background.primary.shadow.default}: none;
      ${COLORS.background.primary.shadow.hover}: none;
      ${COLORS.background.primary.shadow.active}: none;

      ${COLORS.background.accent.default}: var(${GREEN[100]});
      ${COLORS.background.accent.hover}: var(${GREEN[115]});
      ${COLORS.background.accent.active}: var(${GREEN[125]});

      ${COLORS.title.primary.default}: var(${GREY[100]});
      ${COLORS.title.primary.hover}: var(${GREEN[25]});
      ${COLORS.title.primary.active}: var(${GREEN[50]});

      ${COLORS.title.accent.default}: var(${GREY[800]});
      ${COLORS.title.accent.hover}: var(${GREY[800]});
      ${COLORS.title.accent.active}: var(${GREY[800]});

      ${COLORS.description.primary}: var(${GREY[300]});
      ${COLORS.description.accent}: var(${GREY[800]});

      ${COLORS.image.primary.icon}: var(${GREEN[25]});
      ${COLORS.image.primary.background}: var(${GREEN_ALFA[24]});

      ${COLORS.image.accent.icon}: var(${GREY[800]});
      ${COLORS.image.accent.background}: var(${BLACK_ALFA[4]});

      ${COLORS.plus.primary.default}: var(${GREY[100]});
      ${COLORS.plus.primary.hover}: var(${GREEN[25]});
      ${COLORS.plus.primary.active}: var(${GREEN[50]});

      ${COLORS.plus.accent.default}: var(${GREY[800]});
      ${COLORS.plus.accent.hover}: var(${GREY[800]});
      ${COLORS.plus.accent.active}: var(${GREY[800]});
    }
  }
`;
