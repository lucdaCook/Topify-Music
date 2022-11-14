import { useContext, useEffect, useRef } from 'react'
import { CredentialsContext } from '../contexts/CredentialsContext'
import { LibraryContext } from '../contexts/LibraryContext'
import { SongContext } from '../contexts/SongContext'

export default function SearchQueryPlayer() {
  const { handlePause, handleResume, isPaused } = useContext(SongContext)

  const { unlike, isLiked, like, checkIfLiked } = useContext(LibraryContext)
  const { user } = useContext(CredentialsContext)

  const heartLikedRef = useRef(null)
  const heartRef = useRef(null)

  function addLike(name , uri, artists, image, album, duration, id) {
    heartRef.current.classList.add('like-animation')
    heartRef.current.children[0].lastChild.setAttribute(
      'd', 
      'M 15.724 4.22 A 4.313 4.313 0 0 0 12.192 0.814 a 4.269 4.269 0 0 0 -3.622 1.13 a 0.837 0.837 0 0 1 -1.14 0 a 4.272 4.272 0 0 0 -6.21 5.855 l 5.916 7.05 a 1.128 1.128 0 0 0 1.727 0 l 5.916 -7.05 a 4.228 4.228 0 0 0 0.945 -3.577 Z'
      )
    heartRef.current.classList.remove('unlike-animation')

    like(name, uri, artists, image, album, duration, id);
  }
 
    function removeLike(id) {
      heartLikedRef.current.classList.add('unlike-animation')
      heartLikedRef.current.children[0].lastChild.setAttribute(
        'd', 
        'M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z'
        )
      heartLikedRef.current.classList.remove('like-animation')
  
      unlike(id);
    }

  const mobileLibraryTrack = JSON.parse(localStorage.getItem('playingTrack'))

  useEffect(() => {
    if(mobileLibraryTrack && Object.keys(mobileLibraryTrack).length > 0 && user) {
    checkIfLiked(mobileLibraryTrack.uri);
    }
  }, [mobileLibraryTrack])


  return (
    <div className='query-player'>
      {
        mobileLibraryTrack && 
        Object.keys(mobileLibraryTrack).length > 0 &&
        <>
          <img src={mobileLibraryTrack.album.images[2].url} style={{ height: '40px', width: '40px' }} />
          <div className='titles-flexbox'>
            <div className='title-position'>
              <div className='title-overflow'>
                <div className='title-align-left'>
                  <span>{mobileLibraryTrack.name}</span>
                </div>
              </div>
            </div>
            <div className='artist-position'>
              <div className='artist-overflow'>
                <div className='artist-align-left'>
                  <span>{mobileLibraryTrack.artists.map((artist, i, artists) => artists.length - 1 === i ? artist.name : artist.name + ', ' )}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      { 
      mobileLibraryTrack &&
      Object.keys(mobileLibraryTrack).length > 0 &&
        <div className='query-controls'>
          {
            !user ? 
            <></> 
            : !isLiked ?
          <button className='heart'  ref={heartRef}>
            <svg role="img" height="24" width="24" viewBox="0 0 24 24" 
            onClick={() => addLike(
              mobileLibraryTrack.name, mobileLibraryTrack.uri, 
              mobileLibraryTrack.artists, mobileLibraryTrack.album.images[2].url, 
              mobileLibraryTrack.album.name, mobileLibraryTrack.duration_ms, mobileLibraryTrack.id
            )}
            >
              <path d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"></path>
            </svg>
          </button>
          :
          <button className='heart fill-mobile' onClick={() => removeLike(mobileLibraryTrack.id)} ref={heartLikedRef}>
            <svg role="img" height="24" width="24" viewBox="0 0 24 24" >
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
