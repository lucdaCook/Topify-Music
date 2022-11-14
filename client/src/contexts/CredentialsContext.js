import { createContext, useEffect, useReducer } from "react";

export const CredentialsContext = createContext();

export const authReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN': 
      return { user: action.payload } 
    case 'LOGOUT':
      return { user: null }
    default: 
      return state
  }
}

export default function CredentialsContextProvider({ children }) {

  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user) {
      dispatch({ type: 'LOGIN', payload: user})
    }
    
  }, [])

  return (
    <CredentialsContext.Provider value={{ ...state, dispatch}}>
      { children }
    </CredentialsContext.Provider>
  )
}