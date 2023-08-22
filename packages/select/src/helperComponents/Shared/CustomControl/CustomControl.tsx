import { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { SelectProps } from '../../../components';

function Stub(): JSX.Element {
  return <></>;
}

export const CustomControl = (props: SelectProps): typeof ReactSelectComponents.Control => {
  const { prefixControl } = props;

  if (!prefixControl) {
    return function (data: React.ComponentProps<typeof ReactSelectComponents.Control>): JSX.Element {
      const {
        selectProps: { toggleMenu },
      } = data;

      return (
        <div role='presentation' onClick={toggleMenu}>
          <ReactSelectComponents.Control {...data} />
        </div>
      );
    };
  }

  const PrefixControlComponent = prefixControl ? memo(prefixControl) : Stub;

  return function (data: React.ComponentProps<typeof ReactSelectComponents.Control>): JSX.Element {
    const {
      children,
      selectProps: { toggleMenu },
    } = data;

    return (
      <div role='presentation' onClick={toggleMenu}>
        <ReactSelectComponents.Control {...data}>
          <PrefixControlComponent {...data} />
          {children}
        </ReactSelectComponents.Control>
      </div>
    );
  };
};
