import { useEffect, useState } from "react";
import pictogramServices from "../services/pictograms";
import loginService from "../services/login";

export function useUser() {
  const [user, setUser] = useState(null);

  // Traer usuario logueado
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      pictogramServices.setToken(user.token);
    }
  }, []);

  // Login
  const login = async ({ username, password }) => {
    const user = await loginService.login({
      username,
      password,
    });

    console.log("user", user);
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    pictogramServices.setToken(user.token);

    setUser(user);
  };

  // Logout
  const logout = () => {
    setUser(null);
    pictogramServices.setToken(user.token);
    window.localStorage.removeItem("loggedUser");
  };

  return {
    user,
    login,
    logout,
  };
}
