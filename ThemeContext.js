import React, {createContext, useContext, useState, useEffect} from 'react';
import {Appearance} from 'react-native';
import {darkTheme, lightTheme} from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(
    systemTheme === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });
    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
