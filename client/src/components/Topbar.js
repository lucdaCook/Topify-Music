import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { SearchContext } from "../contexts/SearchContext";

function Topbar () {

  const { toggleTheme } = useContext(ThemeContext)
  const { handleSearch } = useContext(SearchContext)

  return(
    <div className="top-bar">
      <div className="placeholder">
        <div className="flexline">
          <div className="search-wrapper">
            <div className="search-flexwrap">
              <div className="search-flex">
                <form role="search" className="search" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" className="search-bar" placeholder="Search for music" onChange={(e) => handleSearch(e.target.value)} />
                </form>
                <div className="search-flex type">
                  <span className="searchbar-text">
                    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 
                      101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 
                      3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="theme-btn align-right">
            <button className="theme-btn" onClick={() => toggleTheme()}>
              <div className="theme-btn half-1"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Topbar