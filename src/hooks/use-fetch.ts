import { useState, useEffect } from "react";

export type FetchResult<RequestInfo> = [RequestInfo | null, any, boolean];

/*
 * Hook useFetch - полностью повторяет интервайс функции fetch
 */
export default function useFetch<ResponseDataType>(
  input: RequestInfo,
  options?: RequestInit
): FetchResult<ResponseDataType> {
  const [data, setData] = useState<ResponseDataType | null>(null);
  const [error, setError] = useState(null);
  const isLoading = data === null && error === null;

  useEffect(() => {
    setData(null);
    setError(null);

    fetch(input, options)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        setError(error);
      });
  }, [input, options]);

  return [data, error, isLoading];
}
