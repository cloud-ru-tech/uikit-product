import { createContext } from 'react';

export const AvatarContext = createContext<{ name: string; src?: string }>({ name: '' });
