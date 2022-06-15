import { styled } from '@linaria/react';
import RcSlider from 'rc-slider';

import { InputPrivate } from '@sbercloud/uikit-product-input-private';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

type ShortBaseInputWrapperProps = {
  width: number;
};

PURPLE_THEME;
GREEN_THEME;
PURPLE_DARK_THEME;
GREEN_DARK_THEME;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  min-height: 40px;
  max-height: 40px;
  transition: ${ANIMATIONS.TRANSITION};
  transition-property: color, background-color, border-color;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid var(${COLORS.border.default});
  border-bottom: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: var(${COLORS.background.default});

  &[data-has-more-button] {
    border-radius: 4px 0 0 4px;
  }

  &:hover {
    border-color: var(${COLORS.border.hover});
  }

  &[data-focus='true'] {
    border-color: var(${COLORS.border.active});
  }

  &[data-disabled='true'] {
    border-color: var(${COLORS.border.disabled});
    background-color: var(${COLORS.background.disabled});
  }
`;

const removeInputArrowStyle = `
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

export const BaseInput = styled(InputPrivate)`
  ${removeInputArrowStyle};
`;

export const ShortBaseInputWrapper = styled.div<ShortBaseInputWrapperProps>`
  display: flex;
  width: ${props => (props.width ? `${props.width * 10}px` : '10px')};
`;

export const ShortBaseInput = styled(InputPrivate)`
  ${removeInputArrowStyle};
  text-align: right;
`;

const SliderStyle = `
  margin-top: -8px;
  margin-bottom: 18px;

  & .rc-slider-mark span {
    color: var(${COLORS.slider.mark.default});
    
    &:nth-child(1) {
      transform: unset !important;
    }
    
    &:nth-last-child(1) {
      transform: unset !important;
      left: unset !important;
      right: 0 !important;
    }
  }

  & .rc-slider-handle {
    opacity: 1;
    margin-top: -5.8px;
    
    &:hover {
      border: 2px solid var(${COLORS.slider.handle.border.hover}) !important;
      background-color: var(${COLORS.slider.handle.background.hover}) !important;
    }
    
    &:active {
      border: 2px solid var(${COLORS.slider.handle.border.active}) !important;
      background-color: var(${COLORS.slider.handle.background.active}) !important;
    }
  }
  
  &.rc-slider-disabled {
    background-color: transparent;
    
    .rc-slider-handle {
      opacity: 1;
    
      &:hover {
        border: none !important;
        background-color: var(${COLORS.slider.handle.background.disabled}) !important;
      }
      
      &:active {
        border: none !important;
        background-color: var(${COLORS.slider.handle.background.disabled}) !important;
      }
    }
    
    .rc-slider-mark span {
      color: var(${COLORS.slider.mark.disabled});
    }
    
  }
`;

export const InputSlider = styled(RcSlider)`
  ${SliderStyle};
`;

export const InputRange = styled(RcSlider)`
  ${SliderStyle};
`;

export const dotStyle = {
  display: 'none',
};

export const trackStyle = (disabled: boolean) => ({
  borderRadius: '0px',
  backgroundColor: disabled ? `var(${COLORS.slider.track.disabled})` : `var(${COLORS.slider.track.default})`,
});

export const railStyle = (disabled: boolean) => ({
  borderRadius: '0px',
  backgroundColor: disabled ? `var(${COLORS.slider.rail.disabled})` : `var(${COLORS.slider.rail.default})`,
});

export const handleStyle = (disabled: boolean) => ({
  width: '16px',
  height: '16px',
  border: 'none',
  boxShadow: 'none',
  backgroundColor: disabled
    ? `var(${COLORS.slider.handle.background.disabled})`
    : `var(${COLORS.slider.handle.background.default})`,
});

export const InputPostfixTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  color: var(${COLORS.currency.default});

  &[data-disabled='true'] {
    color: var(${COLORS.currency.disabled});
  }
`;

export const DelimiterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
  color: var(${COLORS.delimiter.default});

  &[data-disabled='true'] {
    color: var(${COLORS.delimiter.disabled});
  }
`;
