import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

export function useFetch<D = any, E = any>(
  config: AxiosRequestConfig,
): [D | undefined, boolean, E | undefined] {
  const [data, setData] = useState<D | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<E | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    axios
      .request(config)
      .then((resp) => {
        try {
          const data = resp.data satisfies D;
          setData(data as D);
          setLoading(false);
          setError(undefined);
        } catch (error) {
          setData(undefined);
          setLoading(false);
          setError(error as E);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err as E);
        setData(undefined);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(config)]);

  return [data, loading, error];
}

export function useLazyFetch<D = any, E = any>(
  config: AxiosRequestConfig,
): [
  (config: AxiosRequestConfig) => void,
  { data: D | undefined; loading: boolean; error: E | undefined },
] {
  const [data, setData] = useState<D | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<E | undefined>(undefined);

  const fetch = (fetchConfig: AxiosRequestConfig) => {
    const mergedConfig = { ...config, ...fetchConfig };
    setData(undefined);
    setError(undefined);
    setLoading(true);
    axios
      .request(mergedConfig)
      .then((resp) => {
        try {
          const data = resp.data satisfies D;
          setData(data as D);
          setLoading(false);
          setError(undefined);
        } catch (error) {
          setData(undefined);
          setLoading(false);
          setError(error as E);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err as E);
        setData(undefined);
      });
  };

  return [fetch, { data, loading, error }];
}
