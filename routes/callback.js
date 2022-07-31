import express from "express";
import request from "request";
const router = express.Router();
const stateKey = 'spotify_auth_state';

/* GET callback page */
router.get('/', function (req, res, next) {

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  // Check to ensure the state matches.
  if (state === null || state !== storedState) {

    const params = new URLSearchParams({
      error: 'state_mismatch'
    });

    res.redirect('/error' + `?${params.toString()}`);
  } else {
    // if state matches, clear the stateKey cookie, we're finished with it
    res.clearCookie(stateKey);

    // prepare a token request
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
      },
      json: true
    };
  };

  // Request a token
  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {

      // got a token
      var access_token = body.access_token,
        refresh_token = body.refresh_token;

      const params = new URLSearchParams({
        access_token: access_token,
        refresh_token: refresh_token
      });

      res.redirect(process.env.FINAL_RESPONSE_URI + `?${params.toString()}`);



    } else {
      // or error

      const params = new URLSearchParams({
        error: 'invalid_token'
      });

      res.redirect('/error' + `?${params.toString()}`);
    }
  });
});

export default router;