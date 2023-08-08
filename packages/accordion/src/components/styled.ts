import { styled } from '@linaria/react';

import { H3_SEMIBOLD_STYLES, H4_SEMIBOLD_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const AccordionWrapper = styled.div`
  background-color: var(${COLORS.DEFAULT_BG});
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 8px;

  &[data-variant='${Variant.Primary}'] {
    border-radius: 12px;
    &:hover {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      transition: box-shadow 0.2s ease-in;
    }
  }

  &[data-variant='${Variant.Accent}'] {
    background: none;
    border: 1px solid var(${COLORS.ACCENT_BORDER});
  }

  &[data-disabled] {
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const AccordionCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(${COLORS.DEFAULT_HEADER_COLOR});

  &[data-variant='${Variant.Primary}'] {
    ${H3_SEMIBOLD_STYLES};
  }

  &[data-variant='${Variant.Accent}'] {
    ${H4_SEMIBOLD_STYLES};
  }

  &[data-disabled] {
    color: var(${COLORS.DISABLED_HEADER_COLOR});
  }
`;

export const AccordionSubheader = styled.div`
  color: var(${COLORS.DEFAULT_SUBHEADER_COLOR});
  ${TEXT_2_STYLES};

  &[data-disabled] {
    color: var(${COLORS.DISABLED_HEADER_COLOR});
  }
`;

export const AccordionButtons = styled.div`
  display: flex;
  gap: 16px;
`;

export const AccordionContentWrapStyled = styled.div`
  display: grid;
  grid-template-rows: 0fr;

  &[data-with-animation='true'] {
    transition: grid-template-rows 400ms;
  }

  &[aria-hidden='false'] {
    grid-template-rows: 1fr;
  }

  & > div {
    overflow: hidden;
  }
`;

export const AccordionContentStyled = styled.div`
  margin-top: 20px;
`;
