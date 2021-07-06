import * as React from 'react';

type Context = {
  name?: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroupContext = React.createContext<Context | null>(null);
