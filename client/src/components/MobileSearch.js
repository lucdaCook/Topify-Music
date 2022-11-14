import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../contexts/SearchContext'
import MobileSearchShelf from './MobileSearchShelf'
import Navbar from './Navbar'
import SearchQueryPlayer from './QueryPlayer'

export default function MobileSearch({ accessToken }) {

  const [ searchPlayback, setSearchPlayback ] = useState({})
  const [ player, setPlayer ] = useState(undefined)

  const { handleSearchMobile, searchResults, isSearch } = useContext(SearchContext)

  useEffect(() => {

    if(accessToken === undefined) return 
  
    const script = document.createElement("script"); 
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    window.onSpotifyWebPlaybackSDKReady = () => {
  
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(accessToken); },
            volume: 0.5
        });
  
        setPlayer(player);
  
        player.addListener('player_state_changed', ( state => {
  
          if (!state) { 
              return;
          }
      
          setSearchPlayback(state.track_window.current_track);
      
        }));
  
        player.connect() 
    }
  
  }, []);

  useEffect(() => {
    if(searchPlayback && Object.keys(searchPlayback).length > 0) {
      localStorage.setItem('playingTrack', JSON.stringify(searchPlayback))
    }
  }, [searchPlayback])

  return (
    <>
      <div className='Root_mobile-search'>
        <h1>Search</h1>
        <div className="search-wrapper" style={{ margin: '0 2px'}}>
          <div className="search-flexwrap">
            <div className="search-flex">
              <form role="search" className="search" onSubmit={(e) => e.preventDefault()}>
                <input type="text" className="search-bar" placeholder="Search for music" onChange={(e) => handleSearchMobile(e.target.value)}/>
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
      </div>
      <div className='content-padding'>
        {
          isSearch && searchResults.length > 0 && 
            searchResults.map((item, i) => (
              <MobileSearchShelf key={i} item={item} />
            ))
        }
      </div>
      <div className="footer-wrapper">
        <div className="footer-gradient"></div>
        <SearchQueryPlayer /> 
        <Navbar />
      </div>
    </>
  )
}