import { IUser } from "@/models";
import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

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
  children: JSX.Element;
}> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });

  const router = useRouter();

  useEffect(() => {
    let verifyToken = async () => {
      const {
        data: { user, isValid },
      } = await axios.get("/api/auth/session");

      if (isValid) {
        setAuthState({
          isLoggedIn: isValid,
          user,
        });
      } else {
        router.push("/auth");
      }
    };

    verifyToken();
  }, [router]);

  const login = async (user: IUser) => {
    try {
      const response = await axios.post("/api/auth/login", user);
      console.log({ responseLogin: response });

      if (response.data.ok) {
        const authData: AuthState = {
          isLoggedIn: true,
          user: response.data.user,
        };
        localStorage.setItem("token", response.data.token);
        setAuthState(authData);
        router.push("/home");
      } else {
        console.log("Error", response.data.msj);
      }
    } catch (error) {
      console.log("Error en login", error);
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
        router.push("/home");
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
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
