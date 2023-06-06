import { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { SelectProps } from '../../../components';

function Stub(): JSX.Element {
  return <></>;
}

export const CustomIndicator = (props: SelectProps): typeof ReactSelectComponents.Control => {
  const { postfixControl } = props;

  if (!postfixControl) {
    return () => null;
  }

  const PostfixControlComponent = postfixControl ? memo(postfixControl) : Stub;

  return function (data: React.ComponentProps<typeof ReactSelectComponents.Control>): JSX.Element {
    return <PostfixControlComponent {...data} />;
  };
};
