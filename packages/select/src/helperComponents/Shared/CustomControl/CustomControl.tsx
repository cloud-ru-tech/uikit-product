import { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { ISelectProps } from '../../../components';

const Stub = (): JSX.Element => <></>;

export const CustomControl = <CustomOptionType,>(
  props: ISelectProps<CustomOptionType>,
): typeof ReactSelectComponents.Control => {
  const { prefixControl } = props;

  if (!prefixControl) {
    return (data: React.ComponentProps<typeof ReactSelectComponents.Control>): JSX.Element => {
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

  return (data: React.ComponentProps<typeof ReactSelectComponents.Control>): JSX.Element => {
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
