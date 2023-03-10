import { AuthContext, AuthContextType } from "@/context/authContext";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
  const { isLoggedIn, user, login, register, logout } = useContext(AuthContext);

  const isAuthenticated = (): boolean => {
    return !!(isLoggedIn && user);
  };

  return {
    isLoggedIn,
    user,
    login,
    register,
    logout,
    isAuthenticated,
  };
};
