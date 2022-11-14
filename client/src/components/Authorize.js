import React, { useEffect } from "react";

const AUTH_URI = `https://accounts.spotify.com/authorize?client_id=ca5506c5cf21478e8781fe69fd1dfaf2&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-email%20user-read-playback-state%20user-read-private%20user-read-currently-playing%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20streaming`
function Authorize() {

  useEffect(() => {
    localStorage.removeItem('playingTrack')
  }, [])

  useEffect(() => {
    localStorage.removeItem('device');
  }, [])

  return (
  <div className=" container center-btn">
    <button className="center-btn">
      <a href={AUTH_URI}>Connect Your Spotify</a>
    </button>
    <div ></div>
  </div>

)

}

export default Authorize; 
