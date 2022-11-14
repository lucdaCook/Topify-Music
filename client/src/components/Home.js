import Topbar from "./Topbar";
import Browse from "./Browse";
import { useState, useEffect } from 'react'
import QueryHeader from "./QueryHeader";
import { motion } from 'framer-motion'
import QueryBrowse from "./QueryBrowse";

function Home({ accessToken, device, currentTrack }) {
  const [ isMediaQuery, setIsMediaQuery ] = useState(false) 

  useEffect(() => {
    if(window.innerWidth <= 699) {
      setIsMediaQuery(true)
    }
  }, [])

   return (
    <>
        {
          isMediaQuery ? 
          <motion.div className="media-main-flex"
          draggable="false"
          initial={{ opacity: 0 }} 
          animate={ {opacity: 1, animationDelay: '2s' }}
          >
            <QueryHeader />
            <QueryBrowse accessToken={accessToken}/>
          </motion.div>
          :
          <>
            <div className="container main-wrapper">
              <div className="main-view">
                  <Topbar accessToken={accessToken}/>
                  <Browse accessToken={accessToken}  device={device} currentTrack={currentTrack} />
              </div>
            </div>
          </>
  }
  </>
)
}

export default Home