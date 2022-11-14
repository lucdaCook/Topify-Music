import { useContext, useEffect, useState } from "react";
import { SongContext } from "../contexts/SongContext";

function Shelf({ item, i, deviceId }) {

 const { playSong } = useContext(SongContext)
 
 const [ isMediaQuery, setIsMediaQuery ] = useState(false)

 useEffect(() => {
  if(window.innerWidth <= 699) {
    setIsMediaQuery(true)
  }
 }, [])

  return ( 
    <>
    {
    <div className="card-padding" key={i}>
      <div className="content-holder">
        <div className="browse-img-margin">
          <div className="browse-img">
            <img src={item.images[1].url} style={{ height: '153px', width: '153px' }}/>
            <div className="play-clicker">
              <button className="click-play" onClick={() => 
                playSong(item.uri, deviceId)}> 
                <span className="play-circle">
                  <span className="play-triangle">
                    <svg role="img" height="24" width="24" viewBox="0 0 24 24" className="play-vector">
                      <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                    </svg>
                  </span>
                </span> 
              </button>
            </div> 
          </div>
        </div>
        <div className="card-heading">
          <a draggable="false">{item.name}</a>
          <div className="artist">
            <span>{item.artists[0].name}</span>
          </div>
        </div>
      </div>
    </div> 
}
    </>
  )
}

export default Shelf