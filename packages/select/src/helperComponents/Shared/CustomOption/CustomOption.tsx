import { cx } from '@linaria/core';
import { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { SelectProps } from '../../../components';
import { optionClass, StyledDescWrap, StyledOption } from './styled';

const Stub = (): JSX.Element => <></>;

export const CustomOption = (props: SelectProps): typeof ReactSelectComponents.Option => {
  const { prefixOption, postfixOption } = props;

  if (!prefixOption && !postfixOption) {
    return ({ className, ...restData }: React.ComponentProps<typeof ReactSelectComponents.Option>): JSX.Element => (
      <ReactSelectComponents.Option className={cx(className, optionClass)} {...restData} />
    );
  }

  const PrefixOptionComponent = prefixOption ? memo(prefixOption) : Stub;
  const PostfixOptionComponent = postfixOption ? memo(postfixOption) : Stub;

  return ({
    className,
    children,
    ...restData
  }: React.ComponentProps<typeof ReactSelectComponents.Option>): JSX.Element => (
    <ReactSelectComponents.Option className={cx(className, optionClass)} {...restData}>
      <StyledOption>
        <PrefixOptionComponent {...restData}>{children}</PrefixOptionComponent>
        <StyledDescWrap>{children}</StyledDescWrap>
        <PostfixOptionComponent {...restData}>{children}</PostfixOptionComponent>
      </StyledOption>
    </ReactSelectComponents.Option>
  );
};
