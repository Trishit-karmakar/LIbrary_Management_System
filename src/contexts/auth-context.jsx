import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  setToken: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem("token") ?? "");

  const setToken = (value) => {
    setTokenState(value);
    localStorage.setItem("token", value);
  };

  const logout = () => {
    setTokenState("");
    localStorage.clear();
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
