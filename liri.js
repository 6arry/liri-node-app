require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var command = process.argv[2];
var userInput = process.argv[3]

const axios = require('axios');

var getBandInTown = function(bandName){
    var bandURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    axios.get(bandURL)  
    .then(function(response){
            // console.log(respsone);
            for (var i=0; i<response.data.length; i++){
            console.log("name of the venue: "+response.data[i].venue.name);
            console.log("Venue location: "+response.data[i].venue.city+", "+response.data[i].venue.region);
            console.log("Date of the Event: "+moment(response.data[i].datetime).format('MM/DD/YYYY'));
        }
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
        case 'movie-this':
            getMovie(functionData);
        case 'do-what-it-says':
            doWhatItDoBaby(functionData);
        default:
        console.log('LIRI has now idea... what do you want???')
    }
}

var runThis = function(firstArg, secondArg){
    pick(firstArg, secondArg);
};

runThis(command, userInput);