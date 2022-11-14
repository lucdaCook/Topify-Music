import { useState, useContext } from 'react';
import { CredentialsContext } from '../contexts/CredentialsContext'

export default function useSignup() {
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)

  const { dispatch } = useContext(CredentialsContext)

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error);
    }

    if(response.ok) {
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({type: 'LOGIN', payload: json })

      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }

}