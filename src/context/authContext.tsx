import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { routes } from "@/routes";
import { IUser } from "@/models";
import axios from "axios";

interface AuthState {
  isLoggedIn: boolean;
  user: IUser | null;
}

export interface AuthContextType extends AuthState {
  login?: (user: IUser) => void;
  register?: (user: IUser) => void;
  logout?: () => void;
  isAuthenticated?: () => boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthState);

export const AuthProvider: React.FC<{
  children: JSX.Element[] | JSX.Element;
}> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });

  const router = useRouter();

  useEffect(() => {
    let verifyToken = async () => {
      if (!authState.user || !authState.isLoggedIn) {
        const {
          data: { user, isValid },
        } = await axios.get("/api/auth/session");

        if (isValid) {
          setAuthState({
            isLoggedIn: isValid,
            user,
          });
        } else {
          router.push(routes.login);
        }
      }
    };

    verifyToken();
  }, [authState, router]);

  const login = async (user: IUser) => {
    try {
      const response = await axios.post("/api/auth/login", user);

      if (response.data.ok) {
        const authData: AuthState = {
          isLoggedIn: true,
          user: response.data.user,
        };
        localStorage.setItem("token", response.data.token);
        setAuthState(authData);
        router.push(routes.home);

        return response.data;
      } else {
        console.error("Error", response.data.msj);
      }
    } catch (error) {
      console.error("Error en login", error);
    }
  };

  const register = async (user: IUser) => {
    try {
      const response = await axios.post("/api/auth/register", user);
      if (response.data.ok) {
        const authData: AuthState = {
          isLoggedIn: true,
          user: response.data.user,
        };
        localStorage.setItem("token", response.data.token);
        setAuthState(authData);
        router.push(routes.home);

        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await axios.get("/api/auth/logout");
    setAuthState({
      isLoggedIn: false,
      user: null,
    });
    router.push(routes.login);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
