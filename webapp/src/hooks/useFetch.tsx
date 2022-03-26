import { useState, useEffect, useCallback } from 'react';
import { axios } from '../utils';
import type { AxiosRequestConfig } from 'axios';

interface TResult {
  data: any | null;
  loading: boolean;
  error: string | null;
}

type UseFetchReturn = [
  TResult,
  { runFetch: (options?: AxiosRequestConfig) => void },
];

function useFetch(url: string): UseFetchReturn {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<AxiosRequestConfig>({});

  const runFetch = useCallback((options: AxiosRequestConfig = {}) => {
    setOptions(options);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!loading) return;

    const fetchData = async () => {
      try {
        const { data } = await axios(url, options);
        setData(data);
      } catch (err: any) {
        const errorRes = err.response ? err.response.data : 'Server Error';
        setError(errorRes);
      }

      setLoading(false);
    };
    fetchData();
  }, [loading, options, url]);

  return [{ data, loading, error }, { runFetch }];
}

export default useFetch;
