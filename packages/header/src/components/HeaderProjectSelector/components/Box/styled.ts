import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  cursor: pointer;

  display: flex;
  flex-shrink: 0;
  column-gap: 8px;
  align-items: center;

  box-sizing: border-box;
  height: 36px;
  padding: 4px 12px;

  &[data-disabled] {
    cursor: not-allowed;

    padding-right: 0;
  }
`;

export const Toolbar = styled.div`
  margin-left: auto;
`;
