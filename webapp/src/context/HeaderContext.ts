import { createContext } from 'react';

export interface HeaderFlags {
  showSubjectDropdown: boolean;
}

export interface HeaderContextValue {
  headerFlags: HeaderFlags;
  setHeaderContextValue: (headerFlags: HeaderFlags) => void;
}

const HeaderContext = createContext<HeaderContextValue>({
  headerFlags: {
    showSubjectDropdown: true,
  },
  setHeaderContextValue: headerFlags => {},
});

export default HeaderContext;
