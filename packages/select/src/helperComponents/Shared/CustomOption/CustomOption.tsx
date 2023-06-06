import { cx } from '@linaria/core';
import { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { SelectProps } from '../../../components';
import { optionClass, StyledDescWrap, StyledOption } from './styled';

function Stub(): JSX.Element {
  return <></>;
}

export const CustomOption = (props: SelectProps): typeof ReactSelectComponents.Option => {
  const { prefixOption, postfixOption } = props;

  if (!prefixOption && !postfixOption) {
    return function ({
      className,
      ...restData
    }: React.ComponentProps<typeof ReactSelectComponents.Option>): JSX.Element {
      return <ReactSelectComponents.Option className={cx(className, optionClass)} {...restData} />;
    };
  }

  const PrefixOptionComponent = prefixOption ? memo(prefixOption) : Stub;
  const PostfixOptionComponent = postfixOption ? memo(postfixOption) : Stub;

  return function ({
    className,
    children,
    ...restData
  }: React.ComponentProps<typeof ReactSelectComponents.Option>): JSX.Element {
    return (
      <ReactSelectComponents.Option className={cx(className, optionClass)} {...restData}>
        <StyledOption>
          <PrefixOptionComponent {...restData}>{children}</PrefixOptionComponent>
          <StyledDescWrap>{children}</StyledDescWrap>
          <PostfixOptionComponent {...restData}>{children}</PostfixOptionComponent>
        </StyledOption>
      </ReactSelectComponents.Option>
    );
  };
};
