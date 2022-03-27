import { useEffect } from 'react';

function useSetPageTitle(title: string) {
  useEffect(() => {
    document.title = title + ' | JDVNHS';
  }, []);
}

export default useSetPageTitle;
