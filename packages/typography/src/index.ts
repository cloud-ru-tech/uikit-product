import { styled } from '@linaria/react';

export const H1_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 44px;
  line-height: 44px;
  letter-spacing: -0.01em;
  margin: 0;
`;

export const H2_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -0.01em;
  margin: 0;
`;

export const H3_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  margin: 0;
`;

export const H3_SEMIBOLD_STYLES = `
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin: 0;
`;

export const H4_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin: 0;
`;

export const H4_SEMIBOLD_STYLES = `
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin: 0;
`;

export const H5_STYLES = `
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
`;

export const TEXT_1_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`;

export const TEXT_2_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;

export const TEXT_3_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
`;

export const TEXT_4_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
`;

export const TABLE_TEXT_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;

export const NOTIFY_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 12px;
`;

export const MONO_14_STYLES = `
  font-family: 'SB Sans Text Mono', monospace;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;

export const MONO_14_BOLD_STYLES = `
  font-family: 'SB Sans Text Mono', monospace;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
`;

export const CHARTS_GRID_STYLES = `
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 10px;
`;

/**
 * @deprecated
 */
export const H1 = styled.h1`
  ${H1_STYLES};
`;

/**
 * @deprecated
 */
export const H2 = styled.h2`
  ${H2_STYLES};
`;

/**
 * @deprecated
 */
export const H3 = styled.h3`
  ${H3_STYLES};
`;

/**
 * @deprecated
 */
export const H3Semibold = styled.h3`
  ${H3_SEMIBOLD_STYLES};
`;

/**
 * @deprecated
 */
export const H4 = styled.h4`
  ${H4_STYLES};
`;

/**
 * @deprecated
 */
export const H4Semibold = styled.h4`
  ${H4_SEMIBOLD_STYLES};
`;

/**
 * @deprecated
 */
export const H5 = styled.h5`
  ${H5_STYLES};
`;

/**
 * @deprecated
 */
export const Text1 = styled.span`
  ${TEXT_1_STYLES};
`;

/**
 * @deprecated
 */
export const Text2 = styled.span`
  ${TEXT_2_STYLES};
`;

/**
 * @deprecated
 */
export const Text3 = styled.span`
  ${TEXT_3_STYLES};
`;

/**
 * @deprecated
 */
export const Text4 = styled.span`
  ${TEXT_4_STYLES};
`;

/**
 * @deprecated
 */
export const TableText = styled.span`
  ${TABLE_TEXT_STYLES};
`;

/**
 * @deprecated
 */
export const TYPOGRAPHY_VARIABLES = {
  TEXT_1: TEXT_1_STYLES,
  TEXT_2: TEXT_2_STYLES,
  TEXT_3: TEXT_3_STYLES,
  TEXT_4: TEXT_4_STYLES,
  TABLE_TEXT: TABLE_TEXT_STYLES,
};
