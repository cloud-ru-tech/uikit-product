import { memo } from 'react';
import clsx from 'clsx';
import { components as ReactSelectComponents } from 'react-select';

import { ISelectProps } from 'components/Select';

import { StyledDescWrap, StyledOption, optionClass } from './styled';

const Stub = (): JSX.Element => <></>;

export const CustomOption = <CustomOptionType,>(
  props: ISelectProps<CustomOptionType>,
): typeof ReactSelectComponents.Option => {
  const { prefixOption, postfixOption } = props;

  if (!prefixOption && !postfixOption) {
    return (
      data: React.ComponentProps<typeof ReactSelectComponents.Option>,
    ): JSX.Element => (
      <ReactSelectComponents.Option
        className={clsx(data.className, optionClass)}
        {...data}
      />
    );
  }

  const PrefixOptionComponent = prefixOption ? memo(prefixOption) : Stub;
  const PostfixOptionComponent = postfixOption ? memo(postfixOption) : Stub;

  return (
    data: React.ComponentProps<typeof ReactSelectComponents.Option>,
  ): JSX.Element => (
    <ReactSelectComponents.Option
      className={clsx(data.className, optionClass)}
      {...data}
    >
      <StyledOption>
        <PrefixOptionComponent {...data} />
        <StyledDescWrap>{data.children}</StyledDescWrap>
        <PostfixOptionComponent {...data} />
      </StyledOption>
    </ReactSelectComponents.Option>
  );
};

export default CustomOption;
