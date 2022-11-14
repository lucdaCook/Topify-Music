import { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../contexts/SongContext";
import { LibraryContext } from "../contexts/LibraryContext";
import { CredentialsContext } from "../contexts/CredentialsContext";

export default function Player() {

  const {  
    handlePause, 
    handleResume,
    handleSkipNext,
    handleSkipPrev,
    isPaused,
      } = useContext(SongContext)

  const { like, unlike, isLiked, checkIfLiked, setIsLiked } = useContext(LibraryContext)
  const { user } = useContext(CredentialsContext)

  const transparentHeartRef = useRef(null)
  const greenHeartRef = useRef(null)
  const progressRef = useRef(null)
  const inputRef = useRef(null)

  const [ isMediaQuery, setIsMediaQuery ] = useState(false)
  const [ duration, setDuration ] = useState(0)

 useEffect(() => {
  if(window.innerWidth <= 699) {
    setIsMediaQuery(true)
  }
 }, [])

 function setIntervalX(duration, delay, repetitions) {
  var x = 0;
  var intervalID = window.setInterval(function () {

     x++

     if (++x === repetitions) {
         window.clearInterval(intervalID);
     }

     return duration
  }, delay);
}

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  function onRemoveLike(id) {
    greenHeartRef.current.classList.add('unlike-animation')
    greenHeartRef.current.children[0].lastChild.setAttribute(
      'd', 
      'M 1.69 2 A 4.582 4.582 0 0 1 8 2.023 A 4.583 4.583 0 0 1 11.88 0.817 h 0.002 a 4.618 4.618 0 0 1 3.782 3.65 v 0.003 a 4.543 4.543 0 0 1 -1.011 3.84 L 9.35 14.629 a 1.765 1.765 0 0 1 -2.093 0.464 a 1.762 1.762 0 0 1 -0.605 -0.463 L 1.348 8.309 A 4.582 4.582 0 0 1 1.689 2 Z m 3.158 0.252 A 3.082 3.082 0 0 0 2.49 7.337 l 0.005 0.005 L 7.8 13.664 a 0.264 0.264 0 0 0 0.311 0.069 a 0.262 0.262 0 0 0 0.09 -0.069 l 5.312 -6.33 a 3.043 3.043 0 0 0 0.68 -2.573 a 3.118 3.118 0 0 0 -2.551 -2.463 a 3.079 3.079 0 0 0 -2.612 0.816 l -0.007 0.007 a 1.501 1.501 0 0 1 -2.045 0 l -0.009 -0.008 a 3.082 3.082 0 0 0 -2.121 -0.861 Z'
      )
    greenHeartRef.current.classList.remove('like-animation')

    unlike(id);
  }

  function onLike(name , uri, artists, image, album, duration, id) {
    transparentHeartRef.current.classList.add('like-animation')
    transparentHeartRef.current.children[0].lastChild.setAttribute(
      'd', 
      'M 15.724 4.22 A 4.313 4.313 0 0 0 12.192 0.814 a 4.269 4.269 0 0 0 -3.622 1.13 a 0.837 0.837 0 0 1 -1.14 0 a 4.272 4.272 0 0 0 -6.21 5.855 l 5.916 7.05 a 1.128 1.128 0 0 0 1.727 0 l 5.916 -7.05 a 4.228 4.228 0 0 0 0.945 -3.577 Z'
      )
    transparentHeartRef.current.classList.remove('unlike-animation')

    like(name, uri, artists, image, album, duration, id);
  }

  const playingTrack = JSON.parse(localStorage.getItem('playingTrack'))
  const localDevice = localStorage.getItem('device')

  useEffect(() => {
    if(user && playingTrack && Object.keys(playingTrack).length > 0) {
    checkIfLiked(playingTrack.uri);
    }
  }, [playingTrack])

  useEffect(() => {


    if(localStorage.getItem(playingTrack) && JSON.parse(localStorage.playingTrack).duration_ms) {
      function setIntervalLimited(callback, interval, x) {
  
        for (var i = 0; i < x; i++) {
            setTimeout(callback, i * interval);
        }
    
    }
  
    setIntervalLimited(function() {
      console.log('hit');
  }, 1000, Math.ceil(playingTrack.duration_ms / 100))
    }
  }, [playingTrack])

  
  return (
 
    <>
    {
      isMediaQuery ? <div>Media Query True</div> 
      :
    <footer className="now-playing-bar">
      <div className="player-wrapper">
        <div className="now-playing-content">
        { 
          playingTrack && 
          Object.keys(playingTrack).length > 0 && 
          <div className="now-playing-widget">
            <div className="now-playing-icon">
              <img src={playingTrack.album.images[2].url} style={{ height: '56px', width: '56px' }} />
            </div>
            <div className="now-playing-text">
              <div className="now-playing-title">
                <span>{playingTrack.name}</span>
              </div>
              <div className="now-playing-artist">
                <span>{playingTrack.artists.map((artist, i, artists) => artists.length - 1 === i ? artist.name : artist.name + ', ' )}</span>
              </div>
            </div>
            <>
            {
              !user ?
              <></>
              :
             !isLiked ?
              <button className="like-btn" 
              onClick={() => onLike(playingTrack.name, playingTrack.uri, 
              playingTrack.artists, playingTrack.album.images[2].url, 
              playingTrack.album.name, playingTrack.duration_ms, playingTrack.id)
            }  
              ref={transparentHeartRef}
              data-title="Save to library"
              >
              
                <svg className="transparent" role="img" height="16" width="16" viewBox="0 0 16 16" >
                  <path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 
                  01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 
                  3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 
                  00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"
                  >
                  </path>
                </svg>
              </button>
              :
              <button className="like-btn fill" onClick={() => onRemoveLike(playingTrack.id)} ref={greenHeartRef} title="Remove from library">
                <svg className="fill" role="img" height="16" width="16" viewBox="0 0 16 16">
                  <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
                </svg>
              </button>
            }
            </>
          </div>
        }
        </div>
        <div className="controls">
          <div className="playback-controls">
            <div className="playback-widget">
              <div className="controls-left">
                <button className="previous-btn" onClick={() => handleSkipPrev(localDevice)}>
                  <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                    <path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"></path>
                  </svg>
                </button>
              </div>
              {
                !isPaused ? 
                <button id="play" className="play-pause" onClick={() => handlePause()}>
                  <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                    <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
                  </svg>
                </button>
                :
               <button className="play-pause" onClick={() => handleResume()}>
                  <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                    <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
                  </svg>
                </button>
              }
              <div className="controls-right">
                <button className="skip-btn" onClick={() => handleSkipNext(localDevice)}>
                <svg role="img" height="16" width="16" viewBox="0 0 16 16" >
                  <path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path>
                </svg>
                </button>
            </div>
            </div>
            {/* {
              playingTrack && 
              Object.keys(playingTrack).length > 0 && 
            <div className="playback-bar">
              <div className="playback-position">0:00</div> 
              <label className="hidden-slider">
                Change progress
                <input type="range" min="0" max={playingTrack.duration_ms / 100 } step="5" value={duration} />
              </label>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div className="progress-bar-flex">
                    <div className="progress-bar-radius">

                    </div>
                  </div>
                </div>
              </div>
               <div className="playback-duration">{millisToMinutesAndSeconds(playingTrack.duration_ms)}</div>
            </div> 
            } */}
          </div>
        </div>
        <div className="volume-wrapper" style={{ visibility : 'hidden' }}>
          <div className="volume-align-right">
            <button className="volume-bar-icon">
              <svg role="presentation" height="16" width="16" aria-label="Volume high" id="volume-icon" viewBox="0 0 16 16">
                <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path>
                <path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path>
              </svg>
            </button>
          </div>
          <div className="volume-slider" id="volume-slider" 
          >
            <div className="volume-slider-pos" >
              <label className="hidden-slider" htmlFor="volume">
                Change volume
                <input type="range" min="0" max="1" step="0.1" id="volume"
                onChange={(e) => progressRef.current.style.setProperty('--progress-transform', e.target.value * 100 + '%')}
                ref={inputRef}
                />
              </label>
              <div className="slider-bar" ref={progressRef}>
                <div className="slider-bar-bg">
                  <div className="slider-show" >
                  </div>
                </div>
                <div className="slider-active"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
}
    </>
  )
}