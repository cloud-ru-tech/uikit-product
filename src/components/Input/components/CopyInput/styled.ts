import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_INPUT } from 'theme/color/vars';

const copyButtonClassName = css`
  margin-right: -8px;

  &[data-size='xs'] {
    padding: 7px;
  }

  &[data-variant='transparent'] {
    fill: var(${COLORS_INPUT.COPY_INPUT_ICON_COLOR});
    background: var(${COLORS_INPUT.COPY_INPUT_ICON_BACKGROUND_COLOR});

    &:hover {
      fill: var(${COLORS_INPUT.COPY_INPUT_ICON_HOVER_COLOR});
      background: var(${COLORS_INPUT.COPY_INPUT_ICON_BACKGROUND_COLOR});
    }
  }
`;

const StyledInput = styled.div`
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  font-family: SB Sans Interface;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  outline: 0;
  height: 40px;
  padding: 10px 40px 10px 12px;
  background-color: var(${COLORS_INPUT.COPY_INPUT_BACKGROUND});
  border: 0;
  border-radius: 2px;
  color: var(${COLORS_INPUT.COPY_INPUT_COLOR});
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &::placeholder {
    color: var(${COLORS_INPUT.INPUT_DISABLED_COLOR});
  }

  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.span<{ minWidth: string }>`
  min-width: ${(props): string => props.minWidth};
  margin-right: 12px;
  color: #a0a0a0;
`;

const StyledWrap = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: row;
  align-items: center;
`;

const StyledInputWrapper = styled.div<{ labelMinWidth?: string }>`
  position: relative;
  width: ${props =>
    props.labelMinWidth ? `calc(100% - ${props.labelMinWidth})` : '100%'};
`;

const StyledIconWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

export {
  Label,
  StyledWrap,
  StyledInput,
  StyledIconWrapper,
  StyledInputWrapper,
  copyButtonClassName,
};
