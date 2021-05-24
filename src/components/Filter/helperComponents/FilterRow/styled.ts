import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const FilterRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 0;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

export const FilterColumn = styled.div`
  flex-basis: 33%;
  flex-grow: 1;
  padding-right: 4px;

  &[data-delete] {
    flex-basis: 28px;
    flex-grow: 0;
    padding-right: 0;
    padding-left: 8px;
    line-height: 0;
  }
`;

export const filterInputClassName = css`
  height: 34px;
  padding: 8px 12px;
`;
