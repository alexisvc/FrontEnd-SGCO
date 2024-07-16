import { useEffect, useState } from "react";

import loginService from "../services/login";

export function useUser() {
  const [user, setUser] = useState(null);

  // Traer usuario logueado
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  // Login
  const login = async ({ username, password }) => {
    const user = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem("loggedUser", JSON.stringify(user));

    setUser(user);
  };

  // Logout
  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  return {
    user,
    login,
    logout,
  };
}
