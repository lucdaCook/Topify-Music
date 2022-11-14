import { useState, useEffect } from "react";
import axios from 'axios'


export default function useAuth(code) {
  const [ accessToken, setAccessToken ] = useState();
  const [ refreshToken, setRefreshToken ] = useState();
  const [ expiryToken, setExpiryToken ] = useState();


  useEffect(() => {
    axios
    .post('http://localhost:8000/login', {
      code 
    })
    .then(response => {
      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
      setExpiryToken(response.data.expiryToken)
      window.history.pushState({}, null, '/');
    })
    .catch(() => {
      window.location = '/'
    })
  }, [code])

  useEffect(() => {
  if(!refreshToken || !expiryToken) {
    return 
  }
  
  const interval = setInterval(() => {
    axios
    .post('http://localhost:8000/refresh', {
      refreshToken
    })
      .then(response => {
        setAccessToken(response.data.accessToken)
        setExpiryToken(response.data.expiresIn)
      })
      .catch(() => {
        window.location = '/'
      })
    }, (expiryToken - 60) * 1000)

    return () => clearInterval(interval)

  }, [refreshToken, expiryToken])

  return accessToken
}

