import React, { useContext } from "react";
import { SongContext } from "../contexts/SongContext";

export default function MobileSearchShelf({ item, i }) {

  const { playSongFromLibrary } = useContext(SongContext)

  const localDevice = localStorage.getItem('device')

  return (
    <div className="search-result">
      <div className="search-grid">
        <button className="play-search" onClick={() => playSongFromLibrary(item.uri, localDevice)}>
          <div className="searched-image">
            <img src={item.album.images[2].url} style={{ height: '50px', width: '50px' }}/>
          </div>
          <div className="search-content">
            <div className="search-title">
              <span>{item.name}</span>
            </div>
            <span className="search-artists">
              {item.artists.map((a, i, artists) => i === artists.length - 1  ? a.name  : a.name + ' | ')}
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}