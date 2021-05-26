import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_LOGS_VIEW } = EXPORT_VARS;

export const Main = styled.div`
  padding: 8px 8px 8px 12px;
  background: var(${COLORS_LOGS_VIEW.BG});
  position: relative;
`;

export const Content = styled.div`
  height: 100%;
  overflow: auto;
`;

export const ItemTitle = styled.div`
  padding: 1rem 0.5rem 0;
  font-size: 1rem;
`;

export const ContentLine = styled.div`
  display: flex;
  margin-left: 1rem;
`;

export const ContentLineText = styled.span`
  display: flex;
  align-items: center;
  word-break: break-all;
`;

export const ButtonBox = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  margin: 8px;
  & > * {
    margin-right: 4px;
  }
`;
