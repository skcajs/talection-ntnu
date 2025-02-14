import { useState, useEffect } from "react";

export function useToken(
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [token, setToken] = useState(() => {
    const savedToken = sessionStorage.getItem("token");
    return savedToken ? JSON.parse(savedToken) : null;
  });

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token, setIsLoggedIn]);

  return { token, setToken };
}
