//server.js
require('dotenv').config()
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/search', function (req, res){
    try{
        const {q} = req.query;
        const query = `#${q}`
        client.get('search/tweets', {q: query, count:50, resultType: 'recent'}, function (error, tweets, response){
            res.json({tweets: tweets.statuses})
        });
    }catch (e){
        console.log(e);
    }
    return null;
})


app.listen(port, () => {
    console.log('Server is up!');
});


