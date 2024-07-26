import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        setUser(data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (err) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return {
    isAuthenticated,
    user,
    loading,
  };
}
