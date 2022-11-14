import { useContext, useEffect, useRef } from 'react'
import { CredentialsContext } from '../contexts/CredentialsContext'
import { LibraryContext } from '../contexts/LibraryContext'
import { SongContext } from '../contexts/SongContext'

export default function QueryPlayer() {
  const { handlePause, handleResume, isPaused } = useContext(SongContext)

  const { unlike, isLiked, like, checkIfLiked } = useContext(LibraryContext)
  const { user } = useContext(CredentialsContext)

  const heartLikedRef = useRef(null)
  const heartRef = useRef(null)

  function addLike(name , uri, artists, image, album, duration, id) {
    heartRef.current.classList.add('like-animation')
    heartRef.current.classList.add('fill')
    heartRef.current.classList.remove('unlike-animation')

    like(name, uri, artists, image, album, duration, id);

  }
 
    function removeLike(id) {
      heartLikedRef.current.classList.add('unlike-animation')
      heartLikedRef.current.classList.remove('like-animation')
  
      unlike(id);
    }

  const mobilePlayingTrack = JSON.parse(localStorage.getItem('playingTrack'))
  const mobileLocalDevice = localStorage.getItem('device')

  useEffect(() => {
    if(mobilePlayingTrack && Object.keys(mobilePlayingTrack).length > 0 && user) {
    checkIfLiked(mobilePlayingTrack.uri);
    }
  }, [mobilePlayingTrack])


  return (
    <div className='query-player'>
      {
        mobilePlayingTrack && 
        Object.keys(mobilePlayingTrack).length > 0 &&
        <>
          <img src={mobilePlayingTrack.album.images[2].url} style={{ height: '40px', width: '40px' }} />
          <div className='titles-flexbox'>
            <div className='title-position'>
              <div className='title-overflow'>
                <div className='title-align-left'>
                  <span>{mobilePlayingTrack.name}</span>
                </div>
              </div>
            </div>
            <div className='artist-position'>
              <div className='artist-overflow'>
                <div className='artist-align-left'>
                  <span>{mobilePlayingTrack.artists.map((artist, i, artists) => artists.length - 1 === i ? artist.name : artist.name + ', ' )}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      { 
      mobilePlayingTrack &&
      Object.keys(mobilePlayingTrack).length > 0 &&
        <div className='query-controls'>
          {
            !user ? 
            <></> 
            : !isLiked ?
          <button className='heart'
          onClick={() => addLike(
            mobilePlayingTrack.name, mobilePlayingTrack.uri, 
            mobilePlayingTrack.artists, mobilePlayingTrack.album.images[2].url, 
            mobilePlayingTrack.album.name, mobilePlayingTrack.duration_ms, mobilePlayingTrack.id
          )} 
           ref={heartRef}>
            <svg role="img" height="24" width="24" viewBox="0 0 24 24" 
            >
              <path d="M 5.21 1.57 a 6.757 6.757 0 0 1 6.708 1.545 a 0.124 0.124 0 0 0 0.165 0 a 6.741 6.741 0 0 1 5.715 -1.78 l 0.004 0.001 a 6.802 6.802 0 0 1 5.571 5.376 v 0.003 a 6.689 6.689 0 0 1 -1.49 5.655 l -7.954 9.48 a 2.518 2.518 0 0 1 -3.857 0 L 2.12 12.37 A 6.683 6.683 0 0 1 0.627 6.714 A 6.757 6.757 0 0 1 5.21 1.57 Z m 3.12 1.803 a 4.757 4.757 0 0 0 -5.74 3.725 l -0.001 0.002 a 4.684 4.684 0 0 0 1.049 3.969 l 0.009 0.01 l 7.958 9.485 a 0.518 0.518 0 0 0 0.79 0 l 7.968 -9.495 a 4.688 4.688 0 0 0 1.049 -3.965 a 4.803 4.803 0 0 0 -3.931 -3.794 a 4.74 4.74 0 0 0 -4.023 1.256 l -0.008 0.008 a 2.123 2.123 0 0 1 -2.9 0 l -0.007 -0.007 a 4.757 4.757 0 0 0 -2.214 -1.194 Z"></path>
            </svg>
          </button>
          :
          <button className='heart fill-mobile' onClick={() => removeLike(mobilePlayingTrack.id)} ref={heartLikedRef}>
            <svg role="img" height="24" width="24" viewBox="0 0 24 24" className='fill'>
              <path d="M 8.667 1.912 a 6.257 6.257 0 0 0 -7.462 7.677 c 0.24 0.906 0.683 1.747 1.295 2.457 l 7.955 9.482 a 2.015 2.015 0 0 0 3.09 0 l 7.956 -9.482 a 6.188 6.188 0 0 0 1.382 -5.234 l -0.49 0.097 l 0.49 -0.099 a 6.303 6.303 0 0 0 -5.162 -4.98 h -0.002 a 6.24 6.24 0 0 0 -5.295 1.65 a 0.623 0.623 0 0 1 -0.848 0 a 6.257 6.257 0 0 0 -2.91 -1.568 Z"></path>
            </svg>
          </button>
          }
          <div>
            { !isPaused ?
            <button className='query-play-pause' onClick={() => handlePause()}>
              <svg role="img" height="24" width="24" viewBox="0 0 24 24" >
                <path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path>
              </svg>
            </button> :
            <button className='query-play-pause' onClick={() => handleResume()}>
              <svg role="img" height="24" width="24" viewBox="0 0 24 24" >
                <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
              </svg>
            </button>
            }
          </div>
        </div>
      }
    </div>
  )
    }
