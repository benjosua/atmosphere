import express from "express";
const router = express.Router();
const stateKey = 'spotify_auth_state';
import { config } from "dotenv";
config();


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

/* API endpoint for login. */
router.get('/', (req, res) => {

    let state = generateRandomString(16);
    res.cookie(stateKey, state);

  // your application requests authorization
  let scope = 'user-top-read' || process.env.SCOPE

    const params = new URLSearchParams({
      response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state
    });

    res.redirect('https://accounts.spotify.com/authorize' + `?${params.toString()}`);

});

export default router;