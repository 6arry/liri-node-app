require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

var axios = require('axios');

// Bands In Town API: 'concert-this' function =============================================
var getBandInTown = function(bandName){
    var bandURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    axios.get(bandURL).then(function(response){
            // console.log(respsone);
            for (var i=0; i<response.data.length; i++){
            console.log('=============================================');
            console.log('Concert #: '+ (i+1));
            console.log("name of the venue: "+response.data[i].venue.name);
            console.log("Venue location: "+response.data[i].venue.city+", "+response.data[i].venue.region);
            console.log("Date of the Event: "+moment(response.data[i].datetime).format('MM/DD/YYYY'));
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
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

// Spotify API: 'spotify-this-song' function ==============================================
var getArtistNames = function(artist){
    return artist.name;
}

var getSpotifySong = function(songName){
    if (!songName){
        songName = "The Sign";
    };

    spotify.search({ type: 'track', query: songName }, function(err, response) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // console.log(response.tracks.items);
        
        var songs = response.tracks.items;
        for(var i=0; i<songs.length; i++){
            console.log('----------------------------------------------');
            console.log(i+1);
            console.log('Artist(s): '+songs[i].artists.map(getArtistNames));
            console.log('Song name: '+songs[i].name);
            console.log('Preview song: '+songs[i].preview_url);
            console.log('Album: '+songs[i].album.name);
            console.log('==============================================');
        }
    });
}

// Axios (OMDB) API: 'movie-this' function
var getMovie = function(movieName){
    if (!movieName){
        movieName = "Mr. Nobody";
    };

    var movieURL = "http://www.omdbapi.com?t="+movieName+"&y=&plot=short&apikey=trilogy";
    // console.log(movieURL);

    axios.get(movieURL).then(function(response){
        var movie = response.data;
            // console.log(movie.data);

            console.log('=============================================');
            console.log("* Title of the movie: "+movie.Title+"\r\n");
            console.log("* Year the movie came out: "+movie.Year+"\r\n");
            console.log("* IMDB Rating of the movie: "+movie.imdbRating+"\r\n");
            console.log("* Rotten Tomatoes Rating of the movie: "+movie.Ratings[1].Value+"\r\n");
            console.log("* Country where the movie was produced: "+movie.Country+"\r\n");
            console.log("* Language of the movie: "+movie.Language+"\r\n");
            console.log("* Plot of the movie: "+movie.Plot+"\r\n");
            console.log("* Actors in the movie: "+movie.Actors+"\r\n");
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    });
};

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
            break;
        case 'do-what-it-says':
            doWhatItDoBaby(functionData);
            break;
        default:
        console.log('LIRI has no idea... what do you want???')
    }
}

var runThis = function(firstArg, secondArg){
    pick(firstArg, secondArg);
};

runThis(command, userInput);