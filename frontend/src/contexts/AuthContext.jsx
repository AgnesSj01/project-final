import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken"),
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName"),
  );

  const isLoggedIn = !!accessToken;

  const login = (token, name) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userName", name);
    setAccessToken(token);
    setUserName(name);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    setAccessToken(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
