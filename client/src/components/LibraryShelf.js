import { useContext } from "react";
import { LibraryContext } from "../contexts/LibraryContext";
import { SongContext } from "../contexts/SongContext";

export default function LibraryShelf ({ like, i  }) {
  const { removeLikeFromLibrary } = useContext(LibraryContext)
  const { playSongFromLibrary } = useContext(SongContext)

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  function playLike(songId, device) {
    playSongFromLibrary(songId, device)
  }

  function timeElpasedSinceLike(time) {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, 'seconds', 1],  
      [120, '1 minute ago', '1 minute from now'], 
      [3600, 'minutes', 60],  
      [7200, '1 hour ago', '1 hour from now'], 
      [86400, 'hours', 3600], 
      [172800, 'Yesterday', 'Tomorrow'], 
      [604800, 'days', 86400], 6
      [1209600, 'Last week', 'Next week'], 
      [2419200, 'weeks', 604800], 
      [4838400, 'Last month', 'Next month'], 
      [29030400, 'months', 2419200], 
      [58060800, 'Last year', 'Next year'], 
      [2903040000, 'years', 29030400], 
      [5806080000, 'Last century', 'Next century'], 
      [58060800000, 'centuries', 2903040000] 
    ];

    var seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;
  
    if (seconds == 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    var i = 0,
      format;
    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  }
  
  const device = localStorage.device

  return (
    <div className="row-container" key={i}>
      <div className="row-grid">
        <div className="row-content rank">
          <span>{i + 1}</span>
          <button className="play-liked" onClick={() => playLike(like.uri, device)}>
          <svg role="img" height="24" width="24" viewBox="0 0 24 24">
            <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
          </svg>
          </button>
        </div>
        <div className="row-content title">
          <img src={like.images[0]} style={{ height: '40px', width: '40px'}} />
          <div className="like-song">
            <span>{like.title}</span>
            <span>{like.artists.map((artist, i, artists) => artists.length - 1 === i ? artist.name : artist.name + ', ' )}</span>
          </div>
        </div>
        <div className="row-content album">
          <span>{like.album}</span>
        </div>
        <div className="row-content date">
          <span>{timeElpasedSinceLike(like.createdAt)}</span>
        </div>
        <div className="row-content end">
          <button className="remove-like" onClick={() => removeLikeFromLibrary(like._id)}>
            <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
            </svg>
          </button>
          <div className="row-duration-right">{millisToMinutesAndSeconds(like.duration)}</div>
        </div>
      </div>
    </div>
  )
}