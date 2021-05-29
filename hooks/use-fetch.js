import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(async credentials => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/sign-in-up", {
        method: "POST",
        body: JSON.stringify({
          ...credentials,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const fetchedData = await response.json();

      if (!response.ok) {
        throw new Error(fetchedData.message);
      }
      setIsLoading(false);

      if (credentials.type === "login") {
        const expiresIn = +fetchedData.expiresIn;
        //fix 120 seconds to logout, if u want logout according to Firebase expiresIn time, use it instead of 120 below
        const expirationTime = new Date(
          new Date().getTime() + 120 * 1000
        ).toISOString();
        return { ok: true, ...fetchedData };
      }
      return { ok: true, ...fetchedData };
    } catch (error) {
      setIsLoading(false);
      return { ok: false, error: error.message };
    }
  }, []);

  return {
    isLoading,
    sendRequest,
  };
};
export default useFetch;
