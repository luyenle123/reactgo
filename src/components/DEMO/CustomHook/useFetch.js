import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(url && url.length > 0){
        setTimeout(() => {
            fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                setError(res.status);
            })
            .then((res) => {
                if(res){
                    setData(res);
                }        
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
        }, 3000);
    }

  }, [url]);

  return [data, isLoading, error];
};

export default useFetch;