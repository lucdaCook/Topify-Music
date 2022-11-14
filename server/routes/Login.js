const express = require('express')
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node')
require('dotenv').config()

router.post('/', (req, res) => {
  const code = req.body.code 
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  })

  spotifyApi
  .authorizationCodeGrant(code)
  .then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  })
  .catch(() => {
    res.status(400)
  })
})

module.exports = router