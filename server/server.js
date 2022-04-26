const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'https://localhost:3000',
    clientId: 'ff90ced069a54f2b817dd02c5c9fa160',
    clientSecret: '315ea3bf8ac7432ca952eeee8901321f'
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
    })
  })
  .catch(() => {
    res.sendStatus(400)
  })
})