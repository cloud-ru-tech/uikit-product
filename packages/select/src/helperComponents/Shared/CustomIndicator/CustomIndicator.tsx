import { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { ISelectProps } from '../../../components';

const Stub = (): JSX.Element => <></>;

export const CustomIndicator = <CustomOptionType,>(
  props: ISelectProps<CustomOptionType>,
): typeof ReactSelectComponents.Control => {
  const { postfixControl } = props;

  if (!postfixControl) {
    return () => null;
  }

  const PostfixControlComponent = postfixControl ? memo(postfixControl) : Stub;

  return (data: React.ComponentProps<typeof ReactSelectComponents.Control>): JSX.Element => (
    <PostfixControlComponent {...data} />
  );
};
