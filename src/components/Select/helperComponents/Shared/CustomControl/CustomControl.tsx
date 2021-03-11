import { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { ISelectProps } from 'components/Select';

const Stub = (): JSX.Element => <></>;

export const CustomControl = <CustomOptionType,>(
  props: ISelectProps<CustomOptionType>,
): typeof ReactSelectComponents.Control => {
  const { prefixControl } = props;

  if (!prefixControl) {
    return (
      data: React.ComponentProps<typeof ReactSelectComponents.Control>,
    ): JSX.Element => (
      <div onClick={data.selectProps.toggleMenu}>
        <ReactSelectComponents.Control {...data} />
      </div>
    );
  }

  const PrefixControlComponent = prefixControl ? memo(prefixControl) : Stub;

  return (
    data: React.ComponentProps<typeof ReactSelectComponents.Control>,
  ): JSX.Element => (
    <div onClick={data.selectProps.toggleMenu}>
      <ReactSelectComponents.Control {...data}>
        <PrefixControlComponent {...data} />
        {data.children}
      </ReactSelectComponents.Control>
    </div>
  );
};
