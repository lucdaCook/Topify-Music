import { createContext, useContext, useState } from "react";
import { CredentialsContext } from "./CredentialsContext";

export const SongContext = createContext()

export default function SongContextProvider ({ accessToken, children }) {

  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ isPaused, setIsPaused ] = useState(true)

  const { user } = useContext(CredentialsContext)

  function playSongFromLibrary(songId, device) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken)

    var raw = "{\n  \"uris\": [\"" + songId + "\"],\n  \"position_ms\": 0\n}";

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api.spotify.com/v1/me/player/play?device_id=" + device, requestOptions)
      .then(() => {
        setIsPlaying(true)
        setIsPaused(false)
      })
  }

  function handleSkipPrev(deviceId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`, requestOptions)
      .then(response => {
        if(response.ok) {
          setIsPlaying(true)
        }

        if(!response.ok) {
          setIsPlaying(false)
        }
      })
  }

  function handleSkipNext(deviceId) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, requestOptions)
      .then(response => {
        if(response.ok) {
          setIsPlaying(true)
        }

        if(!response.ok) {
          setIsPlaying(false)
        }
      })
  }


  function handlePause() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken)


    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.spotify.com/v1/me/player/pause", requestOptions)
      .then(setIsPaused(true))
  }

  function handleResume(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken)

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };

  fetch("https://api.spotify.com/v1/me/player/play", requestOptions)
    .then(() => {
      setIsPlaying(true)
      setIsPaused(false)
    })
  }


  function playSong(songId, device) {

    if(!accessToken) {
      return
    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);
    
    var raw = " {\n  \"context_uri\": \"" + songId + "\",\n  \"position_ms\": 0\n}";
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, requestOptions)
      .then(() => {
        setIsPlaying(true)
        setIsPaused(false)

      })
  }

  const values = {
    playSong,
    isPlaying,
    setIsPlaying,
    handlePause,
    handleResume,
    handleSkipNext,
    handleSkipPrev,
    isPaused,
    playSongFromLibrary
  }

  return (
    <SongContext.Provider value={values}>
      {children}
    </SongContext.Provider>
  )
}