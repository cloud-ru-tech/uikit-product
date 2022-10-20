import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  column-gap: 8px;
  display: flex;
  flex-shrink: 0;
  height: 36px;

  cursor: pointer;
  padding: 4px 12px;

  &[data-disabled] {
    padding-right: 0;
    cursor: not-allowed;
  }
`;

export const Toolbar = styled.div`
  margin-left: auto;
`;
