import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CredentialsContext } from "../contexts/CredentialsContext";
import Library from "./Library";
import Home from "./Home";
import SignIn from "./SignIn";
import Signup from "./Signup";
import Settings from "./Settings";
import MobileSearch from './MobileSearch'
import NotFound from "./NotFound";
import { AnimatePresence } from 'framer-motion'
import MobileLibrary from "./MobileLibrary";

export default function AnimatedRoutes({ accessToken }) {
  const location = useLocation();

  const [ isMediaQuery, setIsMediaQuery ] = useState(false)

  useEffect(() => {
   if(window.innerWidth <= 699) {
     setIsMediaQuery(true)
   }
  }, [])

  const { user } = useContext(CredentialsContext)

  return (
    <AnimatePresence mode="wait" >
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={ <Home accessToken={accessToken} /> } /> 
        <Route path='/library' element={ isMediaQuery ? <MobileLibrary accessToken={accessToken}/> : <Library accessToken={accessToken} /> } />
        <Route path='/sign-up' element={ !user ? <Signup /> : <Navigate to='/' /> } />
        <Route path='/sign-in' element={ !user ? <SignIn/> : <Navigate to='/' />}  />
        <Route path='settings' element={ <Settings /> }/>
        <Route path='/search' element={<MobileSearch accessToken={accessToken}/>} />
        <Route path='*' element={ <NotFound /> } />
      </Routes> 
    </AnimatePresence> 
  )
}