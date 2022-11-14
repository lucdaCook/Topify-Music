import { createContext, useState, useEffect } from "react";

export const MediaQueryContext = createContext(false)

export default function MediaQueryContextProvider({ children }) {

  const [ isMediaQuery, setIsMediaQuery ] = useState(false)

 useEffect(() => {
  if(window.innerWidth <= 699) {
    setIsMediaQuery(true)
  }
 }, [])


 return (
  <MediaQueryContext.Provider value={isMediaQuery}>
    { children } 
  </MediaQueryContext.Provider>
 )

}