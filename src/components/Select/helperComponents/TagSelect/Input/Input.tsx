import React from 'react';
import { components as ReactSelectComponents } from 'react-select';

export const Input = (
  props: React.ComponentProps<typeof ReactSelectComponents.Input>,
): JSX.Element => <ReactSelectComponents.Input {...props} isHidden />;
