import { useState } from "react";
import userService from "../services/users";

export function useRegistration() {
  const [isRegistered, setIsRegistered] = useState(false);

  // Register user
  const registerUser = async ({username, name, password}) => {
      await userService.registerUser({
        username, 
        name,
        password
      });
      console.log("usuario creado");
      setIsRegistered(true);
  };

  return { registerUser, isRegistered };
}
