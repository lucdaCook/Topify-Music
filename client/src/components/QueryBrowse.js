import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import QueryPlayer from "./QueryPlayer";
import Shelf from "./Shelf";

export default function QueryBrowse({ accessToken }) {
  const [ header, setHeader ] = useState('')

  useEffect(() => {
    const date = Date()
    const Militarytime = date.split(' ')[4]
    const time = Militarytime.split(':')[0]

    setHeader(() => time >= 17 ? 'Evening': time >= 12 ? 'Afternoon'  : 'Morning')
  }, [])

  const [player, setPlayer] = useState(undefined);
  const [ device, setDevice ] = useState('')
  const [currentTrack, setCurrentTrack] = useState({});
  const [ queryBrowse, setQueryBrowse ] = useState([])

  useEffect(() => {
    localStorage.setItem('device', device)
  }, [device])

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


        if(!localStorage.getItem('device')) {
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

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken) 

    var requestOptions = {
      method: 'GET', 
      headers: myHeaders,   
      redirect: 'follow'  
    }; 
 
    fetch("https://api.spotify.com/v1/browse/new-releases?country=US&limit=36", requestOptions) 
      .then(response => response.json())
      .then(data => {
        setQueryBrowse(data.albums.items) 
      })  
  }, []) 
  
  return (  
    <>
        <div className="media-greeting">
          <h2>Good {header}</h2>
        </div>
        <div className="shelf-row">
          {
          queryBrowse.length > 0 &&   
          queryBrowse.slice(0,5).map((item, i) => ( 
              <Shelf item={item} i={i} key={i} deviceId={device}/>  
          )) 
          }
        </div>
        <div className="shelf-row">
          {
          queryBrowse.length > 5 &&   
          queryBrowse.slice(5,10).map((item, i) => ( 
            <Shelf item={item} i={i} key={i} deviceId={device} />  
          )) 
          }
        </div>
        <div className="shelf-row">
          {
          queryBrowse.length > 10 &&   
          queryBrowse.slice(10,15).map((item, i) => ( 
            <Shelf item={item} i={i} key={i} deviceId={device}/>  
          )) 
          }
        </div>
        <div className="shelf-row">
          {
          queryBrowse.length > 15 &&   
          queryBrowse.slice(15,20).map((item, i) => ( 
            <Shelf item={item} i={i} key={i} deviceId={device}/>  
          )) 
          }
        </div>
        <div className="shelf-row">
          {
          queryBrowse.length > 20 &&   
          queryBrowse.slice(20,25).map((item, i) => ( 
            <Shelf item={item} i={i} key={i} deviceId={device}/>  
          )) 
          }
        </div>
        <div className="shelf-row">
          {
            queryBrowse.length > 25 &&   
            queryBrowse.slice(25,30).map((item, i) => ( 
              <Shelf item={item} i={i} key={i} deviceId={device} />  
            )) 
          }
        </div>
        <div className="shelf-row">
          {
            queryBrowse.length > 30 &&   
            queryBrowse.slice(30, 35).map((item, i) => ( 
              <Shelf item={item} i={i} key={i}  deviceId={device} />   
            )) 
          }
        </div>
        <div className="footer-wrapper">
          <div className="footer-gradient"></div>
          <QueryPlayer currentTrack={currentTrack}/>
          <Navbar />
        </div>
      </>
)
}
