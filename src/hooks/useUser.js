import { useEffect, useState } from "react";
import axios from "axios";
import loginService from "../services/login";

export function useUser() {
  const [user, setUser] = useState(null);

  // Configurar interceptor para añadir token
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    }
  }, []);

  const login = async ({ username, password }) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    setUser(user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    delete axios.defaults.headers.common["Authorization"];
  };

  return { user, login, logout };
}
