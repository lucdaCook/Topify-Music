import { createContext, useState, useEffect } from "react"

export const SearchContext = createContext('')

export default function SearchContextProvider({ accessToken, children }) {
  const [ search, setSearch ] = useState('')
  const [ isSearch, setIsSearch ] = useState(false)
  const [ searchResults, setSearchResults ] = useState([])
  
  async function handleSearch(song) { 

    if(!song) {
      setSearchResults([])
    }

    if(song === '') {
      setIsSearch(false)
    }
    else { 
      const apiToken = await accessToken
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + accessToken)
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      const response = await fetch(`https://api.spotify.com/v1/search?q=${song}&type=track&limit=50`, requestOptions)
      const data = await response.json()

        setSearchResults(data.tracks.items)
        setIsSearch(true)
  }
  }

  async function handleSearchMobile(song) { 

    if(!song) {
      setSearchResults([])
    }

    if(song === '') {
      setIsSearch(false)
    }
    else { 
      const apiToken = await accessToken
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + accessToken)
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      const response = await fetch(`https://api.spotify.com/v1/search?q=${song}&type=track&limit=25`, requestOptions)
      const data = await response.json()

        setSearchResults(data.tracks.items)
        setIsSearch(true)
  }
  }

  const values = {
    search,
    searchResults,
    setSearch,
    setSearchResults,
    handleSearch,
    isSearch,
    setIsSearch,
    handleSearchMobile
  }
  
  return (
    <SearchContext.Provider value={values}>
      { children }
    </SearchContext.Provider>
  )

}
