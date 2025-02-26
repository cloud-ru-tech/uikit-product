import { createContext, SetStateAction, useContext, useState } from 'react';

type SearchContextValue = {
  searchValue: string;
  setSearchValue(searchValue: string): void;
  searchOpened: boolean;
  setSearchOpened: React.Dispatch<SetStateAction<boolean>>;
};

export const SearchContext = createContext<SearchContextValue>({
  searchValue: '',
  searchOpened: false,
  setSearchValue: () => {},
  setSearchOpened: () => {},
});

export function useSearchContext() {
  return useContext(SearchContext);
}

export function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchOpened, setSearchOpened] = useState(false);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue, searchOpened, setSearchOpened }}>
      {children}
    </SearchContext.Provider>
  );
}
