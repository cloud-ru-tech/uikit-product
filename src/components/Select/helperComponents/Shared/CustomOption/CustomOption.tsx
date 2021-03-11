import { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { ISelectProps } from 'components/Select';

import {
  StyledReactSelectOption,
  StyledDescWrap,
  StyledOption,
} from './styled';

const Stub = (): JSX.Element => <></>;

export const CustomOption = <CustomOptionType,>(
  props: ISelectProps<CustomOptionType>,
): typeof ReactSelectComponents.Option => {
  const { prefixOption, postfixOption } = props;

  if (!prefixOption && !postfixOption) {
    return (
      data: React.ComponentProps<typeof ReactSelectComponents.Option>,
    ): JSX.Element => <StyledReactSelectOption {...data} />;
  }

  const PrefixOptionComponent = prefixOption ? memo(prefixOption) : Stub;
  const PostfixOptionComponent = postfixOption ? memo(postfixOption) : Stub;

  return (
    data: React.ComponentProps<typeof ReactSelectComponents.Option>,
  ): JSX.Element => (
    <StyledReactSelectOption {...data}>
      <StyledOption>
        <PrefixOptionComponent {...data} />
        <StyledDescWrap>{data.children}</StyledDescWrap>
        <PostfixOptionComponent {...data} />
      </StyledOption>
    </StyledReactSelectOption>
  );
};

export default CustomOption;
