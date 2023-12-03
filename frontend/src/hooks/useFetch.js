import { useEffect, useState } from "react";
import { httpGet } from "@/services/api";

export default function useFetch(
  url,
  initialValue = [],
  queryParams = "",
  preventFetch = false
) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    if (!preventFetch) {
      let mounted = true;
      if (mounted) setLoading(true);
      httpGet(url + queryParams)
        .then((response) => {
          if (mounted) {
            setLoading(false);
            if ("data" in response) {
              setData(response.data);
            }
          }
        })
        .catch((e) => {
          if (mounted) {
            setLoading(false);
            setError(e);
          }
        });

      return () => (mounted = false);
    }
  }, [url, preventFetch]);

  return {
    error,
    setError,
    loading,
    data,
    setData,
  };
}
