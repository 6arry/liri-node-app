require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var userInput = process.argv[3]

const axios = require('axios');

axios.get('/user?ID=12345')
  .then(function (data) {
    // handle success
    console.log(data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

var getBandInTown = function(bandName){
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")  
    .then(function(data){
        console.log(data);
    })  
    .catch(function (error) {
        // handle error
        console.log(error);
    })
      .finally(function () {
        // always executed
    });
}


var getSpotifySong = function(songName){
    spotify.search({ type: 'track', query: 'songName' }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
    
    console.log(data.tracks.items[0]); 
    });
}

var pick = function(caseCommand, functionData){
    switch(caseCommand){
        case 'concert-this':
            getBandInTown(functionData); 
            break;
        case 'spotify-this-song':
            getSpotifySong(functionData);
            break;
        default:
        console.log('LIRI has now idea... what do you want???')
    }
}

var runThis = function(firstArg, secondArg){
    pick(firstArg, secondArg);
};

runThis(command, userInput);