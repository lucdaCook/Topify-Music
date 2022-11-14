import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogout from '../hooks/useLogout'
import { CredentialsContext } from '../contexts/CredentialsContext'

export default function Sidebar () {

  const { logout } = useLogout()
  const { user } = useContext(CredentialsContext)
  const [ isMediaQuery, setIsMediaQuery ] = useState(false)

 useEffect(() => {
  if(window.innerWidth <= 699) {
    setIsMediaQuery(true)
  }
 }, [])

  function handleLogout() {
    logout();
  }


  return (
    <>
    { isMediaQuery ? <></>

      :
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <h2>Topify Muisc</h2>
        <ul className="bar-ul">
          <li className="bar-list">
            <Link to='/' draggable="false" autoFocus> 
              <svg role="img" height="24" width="24" className="Svg-ytk21e-0 eqtHWV home-icon" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 
                1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z">
                </path>
              </svg>
              <span className="nav-span">Browse</span>
            </Link>
          </li>
          <li className="bar-list">
            <Link to='/library' draggable="false" >
              <svg role="img" height="24" width="24" className="Svg-ytk21e-0 eqtHWV collection-icon" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 
                4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z">
                </path>
              </svg>
              <span className="nav-span">Library</span>
            </Link>
          </li>
        </ul>
        <div className="user-credentials">
          {
          !user &&
            <>
              <Link to="/sign-up" className="sign-in">Sign up</Link>
              <Link to="/sign-in" className="log-in">Log in</Link>
            </>
          }
          { 
          user && 
            <button className="log-out" onClick={handleLogout}>
              <span>Log out</span>
            </button>
          }
        </div>
      </div>
    </div>
    }
    </>
  )
}