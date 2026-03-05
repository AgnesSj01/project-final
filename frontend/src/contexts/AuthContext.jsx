import { createContext, useState } from "react";

export const AuthContext = createContext();

// sessionStorage clears automatically when the browser tab is closed
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("accessToken"),
  );
  const [userName, setUserName] = useState(
    sessionStorage.getItem("userName"),
  );

  const isLoggedIn = !!accessToken;

  const login = (token, name) => {
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("userName", name);
    setAccessToken(token);
    setUserName(name);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userName");
    setAccessToken(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
