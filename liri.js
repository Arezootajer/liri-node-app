//node liri.js my-tweets
//install npm twitter,spotify,request : ok
//function for getting user input , :ok
//function for  switch-case for get user input,:ok
//function for getmytweet:ok
//function for spotify:ok  ....format ??
//function for movie:ok
//function for say :ok
//call functions in side switch :ok
//write log ......not yet 

//node liri.js spotify-this-song '<song name here>'
// node liri.js movie-this '<movie name here>'
// node liri.js do-what-it-says 
var dataKeys = require("./keys.js");
var fs = require('fs'); 
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');


var getMyTweets = function() {
  var client = new twitter(dataKeys.twitterKeys);

  var params = { screen_name: 'Arezootaj', count:10  };

 client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
   var tweetArray = []; 
      for (var i = 0; i < tweets.length; i++) {
        tweetArray.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
  }
}
  else{
  	 console.log( error);
  }
  console.log(tweetArray);
  log(tweetArray);
});

};



var getSpotify = function(songName) {

  if (songName === undefined) {
    songName = 'God Only Knows';
  };

  spotify.search({ type: 'track', query: songName }, function(error, data) {
    if (error) {
      console.log(error);
      return;
    }

    var songInfo = data.tracks.items;
    console.log(songInfo);
    log(songInfo);
   
  });
};



var getMovie = function(movieName) {

  if (movieName === undefined) {
    movieName = 'Mr Nobody';
  }

  var movieurl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";

  request(movieurl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
      'Title: ' : jsonData.Title,
      'Year: ' : jsonData.Year,
      'Rated: ' : jsonData.Rated,
      'IMDB Rating: ' : jsonData.imdbRating,
      'Country: ' : jsonData.Country,
      'Language: ' : jsonData.Language,
      'Plot: ' : jsonData.Plot,
      'Actors: ' : jsonData.Actors,
      'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
      'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
  });
      console.log(data);
      log(data);
   
}
  });

}


var Says = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(',')

    if (dataArr.length == 2) {
     action(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
     action(dataArr[0]);
    }

  });
  log(data);
}

//action function 
var action = function(myaction, input) {
  switch (myaction) {
    case 'my-tweets':
   // console.log('tweets');
     getMyTweets();
      break;
    case 'spotify-this-song':
    //works :)
    // console.log('spotify');
      getSpotify(input);
      break;
    case 'movie-this':
    //Works :)
     //console.log('movie');
      getMovie(input);
      break;
    case 'do-what-it-says':
    //works :)
     //console.log('says');
      Says();
      break;
    default:
      console.log('LIRI has no idea about that');
  }
}



action(process.argv[2], process.argv[3]);


var log = function(data) {
  fs.appendFile("log.txt", '\n-------------------\n');

  fs.appendFile("log.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt updated!");
  });
}