import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Button } from '@sbercloud/uikit-react-button';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  box-sizing: border-box;
`;

export const StyledButton = styled(Button)`
  width: 64px;
  &:hover {
    background-color: transparent;
  }
`;

export const StyledTagWrapper = styled.div`
  flex-grow: 1;
  margin: 0 12px;
  line-height: 0;
  text-align: left;
  width: calc(100% - 64px - 20px - 24px);
`;

export const colorPickerClassName = css`
  width: 20px;
`;
