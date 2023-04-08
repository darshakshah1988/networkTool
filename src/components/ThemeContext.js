import React, { createContext, useState } from 'react'

const defaultProvider = {
    dark: false,
    setDark: () => null,
  }

const ThemeContext = createContext(defaultProvider);

const ThemeProvider = ({children}) => {
    const [dark, setDark] = useState(false);


    const values = {
        dark,
        setDark
      }
    return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider }