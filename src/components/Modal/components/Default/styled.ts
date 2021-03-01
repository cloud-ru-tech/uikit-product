import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { COLORS_MODAL } from 'theme/color/vars';

export const closeButtonStyle = css`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const Title = styled.div`
  color: var(${COLORS_MODAL.TITLE_COLOR});
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 16px;
`;

export const Description = styled.div`
  color: var(${COLORS_MODAL.DESCRIPTION_COLOR});
`;

export const ButtonWrapper = styled.div`
  margin-top: 40px;
`;

export const buttonCSS = css`
  margin-right: 8px;
`;

export const contentCSS = css`
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 316px;
  padding: 32px;
  border: 0;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;
