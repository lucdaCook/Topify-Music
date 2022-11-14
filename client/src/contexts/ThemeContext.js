import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null)

export default function ThemeContextProvider ({ children }) {
  const [ theme, setTheme ] = useState("dark")

  const toggleTheme = () => {
    setTheme((color) => color === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const values = {
    theme, 
    toggleTheme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  )
}
