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
    return ({
      className,
      ...restData
    }: React.ComponentProps<
      typeof ReactSelectComponents.Option
    >): JSX.Element => (
      <ReactSelectComponents.Option
        className={clsx(className, optionClass)}
        {...restData}
      />
    );
  }

  const PrefixOptionComponent = prefixOption ? memo(prefixOption) : Stub;
  const PostfixOptionComponent = postfixOption ? memo(postfixOption) : Stub;

  return ({
    className,
    children,
    ...restData
  }: React.ComponentProps<
    typeof ReactSelectComponents.Option
  >): JSX.Element => (
    <ReactSelectComponents.Option
      className={clsx(className, optionClass)}
      {...restData}
    >
      <StyledOption>
        <PrefixOptionComponent {...restData} children={children} />
        <StyledDescWrap>{children}</StyledDescWrap>
        <PostfixOptionComponent {...restData} children={children} />
      </StyledOption>
    </ReactSelectComponents.Option>
  );
};

export default CustomOption;
