import { createContext } from 'react';

export const DropdownMenuContext = createContext<{ hide: () => void }>({ hide() {} });
