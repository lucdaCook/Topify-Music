import {  useContext, useState, useEffect } from 'react';
import './App.css';
import Authorize from './components/Authorize';
import { ThemeContext } from './contexts/ThemeContext';
import useAuth from './hooks/useAuth';
import { BrowserRouter as Router } from 'react-router-dom'
import AnimatedRoutes from './components/AnimatedRoutes';
import Sidebar from './components/Sidebar';
import SongContextProvider from './contexts/SongContext';
import LibraryContextProvider from './contexts/LibraryContext';
import SearchContextProvider from './contexts/SearchContext';


const code = new URLSearchParams(window.location.search).get('code')


function App() {
  const [ isMediaQuery, setIsMediaQuery ] = useState(false)

 useEffect(() => {
  if(window.innerWidth <= 699) {
    setIsMediaQuery(true)
  }
 }, [])


  const accessToken = useAuth(code)

  const { theme } = useContext(ThemeContext)

  return (
    <div className="Root_main App" id={theme}>
      <SongContextProvider accessToken={accessToken}>
        <SearchContextProvider accessToken={accessToken}>
          <LibraryContextProvider>
            {
              accessToken ? 
              <Router> 
                <Sidebar />
                <AnimatedRoutes accessToken={accessToken} />
              </Router>
              : <Authorize />
            }
          </LibraryContextProvider>
        </SearchContextProvider>
      </SongContextProvider>
    </div>
  );
}

export default App
