import React, { createContext, useState, FC, ReactNode } from 'react';
import { lightTheme, darkTheme } from './Theme';
import { Theme } from '@emotion/react';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  console.log(theme);

  const toggleTheme = () => {
    setTheme((prevTheme: Theme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  if (theme !== lightTheme && theme !== darkTheme) {
    throw new Error('Invalid theme value. Theme must be "light" or "dark".');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

