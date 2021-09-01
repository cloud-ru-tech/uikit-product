import * as React from 'react';

type Context = {
  value?: string | number;
  onChange: (value: React.ReactText) => void;
};

export const RadioGroupContext = React.createContext<Context | null>(null);
