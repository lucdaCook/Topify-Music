import { createContext, useContext, useState } from "react";
import { CredentialsContext } from "./CredentialsContext";

export const LibraryContext = createContext()

export default function LibraryContextProvider({ children }) {

  const { user } = useContext(CredentialsContext)

  const [ library, setLibrary ] = useState([])
  const [ isLiked, setIsLiked ] = useState(false)

  async function checkIfLiked (songId) {
    if(!user) return

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.jwToken)
    
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetch("http://localhost:8000/likes/" + songId, requestOptions)

    if(response.ok) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }

    if(!response.ok) {
      console.clear()
    }
  }

  function removeLikeFromLibrary(songId) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.jwToken);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8000/likes/" + songId, requestOptions)
      .then(response => {
        const newLikes =  library.filter(like => like._id !== songId)
        setLibrary(newLikes)
      })
  }

    
    function like(title, uri, artist, image, album, duration, id) {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + user.jwToken);
      myHeaders.append("Content-Type", "application/json");
    
      const raw = JSON.stringify({
        "title": title,
        "uri": uri,
        "artists": artist,
        "images" : image,
        "album": album,
        "duration": duration,
        "track_id" : id
      });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8000/likes", requestOptions)
      .then(response => response.json())
      .then(newLike => {
        setLibrary(
          [
            ...library, newLike
          ]
        )
        setIsLiked(true)
      })
  }

  function unlike(songId) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.jwToken);

    var raw = JSON.stringify({
      "id": songId

    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/likes", requestOptions)
      .then(() => {
        const newLikes =  library.filter(like => like.track_id !== songId)
        setLibrary(newLikes)
        setIsLiked(false)
      })
      }

  const values = {
    unlike,
    like,
    setIsLiked,
    library,
    setLibrary,
    removeLikeFromLibrary,
    isLiked,
    checkIfLiked
  }

  return (
    <LibraryContext.Provider value={values}>
      { children }
    </LibraryContext.Provider>
  )


}