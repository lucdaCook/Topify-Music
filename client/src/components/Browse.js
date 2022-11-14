import React, { useEffect, useState, useContext } from "react";
import Shelf from "./Shelf";
import { SearchContext } from "../contexts/SearchContext";
import SearchWindow from "./SearchWindow";
import Player from "./Player";

function Browse ({ accessToken }) {
  const apiToken = accessToken
  
  const { searchResults, isSearch, setIsSearch } = useContext(SearchContext)

  const [ browse, setBrowse] = useState([]) 
  const [ player, setPlayer ] = useState(undefined);
  const [ device, setDevice ] = useState('')
  const [ currentTrack, setCurrentTrack]  = useState({});

  useEffect(() => {
    localStorage.setItem('device', device)
  }, [device])

  useEffect(() => {
    setIsSearch(false)
  }, [])
  

  useEffect(() => {

    if(currentTrack && Object.keys(currentTrack).length > 0) {
        localStorage.setItem('playingTrack', JSON.stringify(currentTrack))
      }

  }, [currentTrack])

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


        if(!localStorage.getItem('device')){
        player.addListener('ready', ({ device_id }) => {
            setDevice(device_id);
        });
      }

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.addListener('player_state_changed', ( state => {

          if (!state) { 
              return;
          }
      
          setCurrentTrack(state.track_window.current_track);
      
        }));

        player.connect() 
    }

}, []);

  useEffect(() => { 
    if(!accessToken) return 
    if(isSearch) return

    var myHeaders = new Headers();  
    myHeaders.append("Authorization", "Bearer " + apiToken) 

    var requestOptions = {
      method: 'GET', 
      headers: myHeaders,   
      redirect: 'follow'  
    }; 
 
    fetch("https://api.spotify.com/v1/browse/new-releases?country=US&limit=36", requestOptions) 
      .then(response => response.json())
      .then(data => { 
        setBrowse(data.albums.items) 
      })  
  }, [])
   

  return (  
      <div className="main-content-wrapper">
        <main className="main-view">
          <section className="browse-music">
            <div className="section-flex">  
              <div className="main-grid"> 
                <div className="grid-padding"> 
                  <div className="browse-grid grid-shelves">
                    {
                      !isSearch ? 
                      browse.length > 0 &&   
                      browse.map((item, i) => ( 
                        <Shelf item={item} i={i} key={i} deviceId={device} accessToken={apiToken}/>  
                      )) 
                      : searchResults.length > 0 && searchResults.filter(item => item.album.album_type === 'single').map((item, i) => (
                        <SearchWindow item={item.album} i={i} key={i} deviceId={device} accessToken={apiToken} />
                      ))
                    }
                  </div> 
                </div>
              </div>
            </div>
          </section>
          <div className="player-bar">
            <Player currentTrack={currentTrack} accessToken={accessToken} device={device}/>
          </div>
      </main>
      </div>
  )

}

export default Browse 