import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { CredentialsContext } from "../contexts/CredentialsContext"
import useLogout from "../hooks/useLogout"
import { motion } from 'framer-motion'
import { ThemeContext } from "../contexts/ThemeContext"

export default function Settings() {
  const navigate = useNavigate()

  const { user } = useContext(CredentialsContext)
  const { toggleTheme } = useContext(ThemeContext)
  const { logout } = useLogout();

  function handleLogout() {
    logout()
  }

  return (
    <motion.div className="settings-page transition"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0, x: 350 }}
      draggable="false"
    >
      <div className="settings-flex">
        <button className="leave-settings" onClick={() => navigate('/')} role="menuitem">
          <svg role="img" height="24" width="24" viewBox="0 0 24 24">
            <path d="M3.293 3.293a1 1 0 011.414 0L12 10.586l7.293-7.293a1 1 0 111.414 1.414L13.414 12l7.293 7.293a1 1 0 01-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 01-1.414-1.414L10.586 12 3.293 4.707a1 1 0 010-1.414z"></path>
          </svg>
        </button>
        <>
        {
          user ?
          <>
          <button className="log-out menu-item" onClick={handleLogout}>
            <span>Log out</span>
          </button>
          <div className="line-break"></div>
          <div className="toggle-theme">Toggle Theme</div>
          <label className="switch">
            <input type="checkbox" onClick={() => toggleTheme()}/>
            <span className="slider round"></span>
          </label>
          </>
          :
          <>
            <Link to='/sign-in' className="menu-item">
              <span>Log in</span>
            </Link>
            <Link to='/sign-up' className="menu-item">
            <span>Sign up</span>
          </Link>
          <div className="line-break">
          </div>
          <div className="toggle-theme">Toggle Theme</div>
          <label className="switch">
            <input type="checkbox" onClick={() => toggleTheme()}/>
            <span className="slider round"></span>
          </label>
        </>
        }
        </>
      </div>
    </motion.div>
  )
}