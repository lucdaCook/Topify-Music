import { useContext, useEffect, useState } from "react";
import { CredentialsContext } from "../contexts/CredentialsContext";
import LibraryShelf from "./LibraryShelf";
import Navbar from "./Navbar";
import QueryPlayer from "./QueryPlayer";
import LibraryPlayer from "./Player";
import { LibraryContext } from "../contexts/LibraryContext";
import { SearchContext } from "../contexts/SearchContext";
import { Link } from 'react-router-dom'

export default function Library({ accessToken }) {
  const [ isMediaQuery, setIsMediaQuery ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ libraryPlayback, setLibraryPlayback ] = useState({})
  const [ player, setPlayer ] = useState(undefined)

  const { library, setLibrary } = useContext(LibraryContext)
  const { user } = useContext(CredentialsContext)
  const { setIsSearch } = useContext(SearchContext)

  useEffect(() => {
    setIsSearch(false)
  }, [])

 useEffect(() => {
  if(window.innerWidth <= 699) {
    setIsMediaQuery(true)
  }
 }, [])

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
    
        setLibraryPlayback(state.track_window.current_track);
    
      }));

      player.connect() 
  }

}, []);


useEffect(() => {
  if(libraryPlayback && Object.keys(libraryPlayback).length > 0)
  localStorage.setItem('playingTrack', JSON.stringify(libraryPlayback) )
}, [libraryPlayback])



  useEffect(() => {

    if(!user) return

   async function getLikes () {

      const response = await fetch('http://localhost:8000/likes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.jwToken}`
        }
      })

      const likes = await response.json()
  
      if(response.ok) {
        setLibrary(likes)
        setIsLoading(false) 
      }
    }

    if(user) {
      getLikes()
    }

  }, [])

  const libraryTrack = JSON.parse(localStorage.getItem('playingTrack'))

  return (
    <> 
      {
        !user ?
          <div className="no-user-library">
            <h2>You are not signed in</h2>
            <span>sign in to create a library</span>
          </div> 

          : 
          isLoading ? 
          <div className="loading-library"></div>
          :
          library && library.length > 0 ?
          <div className="section-translate" style={{ transform : 'translateX(200px)'}}>
            <main tabIndex="-1" style={{ minHeight: 'calc(((100vh - 64px) - 90px) - 519px)' }}>
              <section className="library">
                <div className="library-welcome">
                  <div className="gradient-position"></div>
                  <div className="library-gradient"></div>
                  <div className="library-heading">
                    <span className="header-span">
                    <h1 className="library-header">Liked Songs</h1>
                    </span>
                  </div>
                </div>
                <div className="library-content">
                  <div className="library-container">
                    <div className="grid-title-spacing">
                      <div className="grid-titles">
                        <div className="likes-rank">#</div>
                        <div className="like-title">
                          <span>title</span>
                        </div>
                        <div className="like-album">
                          <span>album</span>
                        </div>
                        <div className="like-date">
                          <span>Date Added</span>
                        </div>
                        <div className="like-duration">
                          <div className="align-like-duration">
                          <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                            <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
                            <path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"></path>
                          </svg>
                          </div>
                        </div>
                      </div>
                      </div>
                      <div className="likes" style={{ height: `${library.length * 56}px`}}>
                        <div className="likes-absolute" >
                          <div className="rows-container" style={{ height: `${library.length * 56}px`}}>
                            {
                              library.map((like, i) => (
                                <LibraryShelf like={like} i={i} key={i} />
                              ))
                            }
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
          : 
          <>
          <div className="no-likes">
            <h2>You don't have any liked songs</h2>
            <Link to='/'>Let's look for some</Link>
          </div>
          <div className="footer-wrapper">
          <Navbar />
          </div>
          </>
      }
      {
        isMediaQuery ? 
        <div className="footer-wrapper">
          <div className="footer-gradient"></div>
          <QueryPlayer currentTrack={localStorage.getItem('playingTrack')} device={localStorage.getItem('device')}/> 
          <Navbar />
        </div>
      :
      <div className="player-bar">
        <LibraryPlayer currentTrack={localStorage.getItem('playingTrack')} device={localStorage.getItem('device')} />
      </div>
      }
    </>
  )
}
