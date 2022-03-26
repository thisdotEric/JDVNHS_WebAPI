import { createContext } from 'react';

export interface HeaderFlags {
  showSubjectDropdown: boolean;
  headerStringValue: string;
}

export interface HeaderContextValue {
  headerFlags: HeaderFlags;
  setHeaderContextValue: (headerFlags: HeaderFlags) => void;
}

const HeaderContext = createContext<HeaderContextValue>({
  headerFlags: {
    showSubjectDropdown: true,
    headerStringValue: '',
  },
  setHeaderContextValue: headerFlags => {},
});

export default HeaderContext;
