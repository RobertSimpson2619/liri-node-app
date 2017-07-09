
var newRequest = process.argv[2];

var request = require("request");
var Twitter = require("Twitter");

var fs = require("fs");

var client = new Twitter({
	  consumer_key: '1vadWvyhvZncg3ytcP2DIsBhn',
	  consumer_secret: 'Un6153LDleXpHr2p4hfReohLBpAdBOXZYEtcqAIKWNwvQA5J0a',
	  access_token_key: '4913456606-AqRJXz9E3h39gBwx1UKyiWtNvJyIWThkjdNp6pv',
	  access_token_secret: '1RfazWXh1Zj6gNqVf2tuAZmRx7OARV5rAlLtxoHocQQv8'
	});

	var params = {screen_name: 'Pweeta_Pweet',
				  counts: 20};


var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: "c61b6feb748443afb6987bde99e3b7ee",
    secret: "5bd6a15e62524ea5a1158726dda636ee"
});


// TWITTER-THIS ________________________________________________________________________________________________

if(newRequest == "my-tweets"){
	myTweets();
}

// _____________________________________________________________________________________________________________


// SPOTIFY THIS___________________________________________________________________________________________________
if(newRequest == "spotify-this-song"){

	spotifySong(process.argv[3]);

}

//_________________________________________________________________________________________________________________

// MOVIE THIS ___________________________________________________________________________________________________
if(newRequest == "movie-this"){


		var movieName = process.argv[3];


		if(movieName == undefined){
			movieName = "Mr.Nobody";
		}


		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";





		// Then create a request to the queryUrl
		request(queryUrl, function(error, response, body){
			


		if(!error && response.statusCode === 200){

			console.log("-------------------------------------------------------");
			console.log("The title of the movie is: " + JSON.parse(body).Title);
			console.log("-------------------------------------------------------");
			console.log("The movies release date is:  " + JSON.parse(body).Released);
			console.log("-------------------------------------------------------");
			console.log("The IMBD Rating is:  " + JSON.parse(body).imdbRating);
			console.log("-------------------------------------------------------");
			console.log("The rotten tomato rating is:  " + JSON.parse(body).Ratings[1].Value);
			console.log("-------------------------------------------------------");
			console.log("The movie was made in:  " + JSON.parse(body).Country);
			console.log("-------------------------------------------------------");
			console.log("The movie's language is: " + JSON.parse(body).Language);
			console.log("-------------------------------------------------------");
			console.log("Plot of the movie: " + JSON.parse(body).Plot);
			console.log("-------------------------------------------------------");
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log("-------------------------------------------------------");
			
		}
	});
}

//__________________________________________________________________________________________________________
if(newRequest == "do-what-it-says" ){
		doWhatItSays();
}




function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }
        // console.log(data);

        var dataArr = data.split(",");
        console.log(dataArr);

        var command = dataArr[0];
        console.log("Command: " + command)

        if (command == "spotify-this-song") {
            spotifySong(dataArr[1]);
        }
    })
};


function spotifySong(songTitle = "The Sign") {
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        if (songTitle == "The Sign") {
            console.log(data.tracks.items[4].album.artists[0].name);
            console.log(data.tracks.items[4].name);
            console.log(data.tracks.items[4].preview_url)
            console.log(data.tracks.items[4].album.name);
        } else {
            console.log(data.tracks.items[0].album.artists[0].name)
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url)
            console.log(data.tracks.items[0].album.name);
        }

    });
};

function myTweets() {

	    client.get('statuses/user_timeline', params, function(error, tweets, response) {
	        if (!error) {
	            // console.log(tweets);

	            for (i = 0; i < tweets.length; i++) {
	                console.log(tweets[i].text)
	                console.log(tweets[i].created_at);
	            };
	        };
	    });
	};