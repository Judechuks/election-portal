import { createContext, useContext } from "react";

export const ThemeContext = createContext(undefined);
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
