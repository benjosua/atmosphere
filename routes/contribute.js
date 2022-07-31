import express from "express";
import fetch from "node-fetch";
import User from '../models/user.js';
const router = express.Router();


/* GET contribute page */

router.get('/', (req, res) => {

    let access_token = req.query.access_token;

    let options = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
    };

    let id;
    let artistList = []

    let promises = [
        fetch('https://api.spotify.com/v1/me', options).then(res => res.json()),
        fetch('https://api.spotify.com/v1/me/top/artists', options).then(res => res.json())
    ]

    Promise.all(promises).then(([me, top]) => {
        id = me.id;
        top.items.forEach(artist => artistList.push({ Name: artist.name, id: artist.id }));
    }).then(async () => {

        const userExists = await User.exists({ name: id });
        if (userExists) {
            console.log("User exists");
        } else {
            const user = await User.create({ name: id, artists: artistList})
            console.log(user)
        }
        
    }).then((data) => res.send(`Success: ${data}`))

});

export default router;