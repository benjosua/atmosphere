import express from "express";
import fetch from "node-fetch";
const router = express.Router();
import { config } from "dotenv";
config();

router.get('/', async function (req, res, next) {

  let token = req.query.refresh_token;

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    })
  })
    .then(response => response.json())
    .then(data => res.send(data))
    .catch((error) => {
      console.error('Error:', error);
    });

})

export default router;