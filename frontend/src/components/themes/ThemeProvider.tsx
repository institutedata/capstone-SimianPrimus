import React, { createContext, useState, FC, ReactNode } from "react";
import { lightTheme, darkTheme } from "./Theme";
import { Theme } from "@emotion/react";

// Context type
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create context with default value
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  console.log(theme);
  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme: Theme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };
  // Check if theme is valid
  if (theme !== lightTheme && theme !== darkTheme) {
    throw new Error('Invalid theme value. Theme must be "light" or "dark".');
  }
  // Return provider with value
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
