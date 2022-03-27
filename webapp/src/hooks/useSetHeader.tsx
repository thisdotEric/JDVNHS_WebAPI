import { useEffect, useContext } from 'react';
import { HeaderFlags, HeaderContext } from '../context';

function useSetHeader(header: HeaderFlags) {
  const { setHeaderContextValue } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContextValue({ ...header });

    return () => {
      setHeaderContextValue({
        showSubjectDropdown: true,
        headerStringValue: '',
      });
    };
  }, []);
}

export default useSetHeader;
