import { useEffect } from 'react';

function useSetPageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, []);
}

export default useSetPageTitle;
