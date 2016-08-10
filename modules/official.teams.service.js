'use strict';

const request = require( 'request' );
const fs = require( 'fs' );
const config = require( '../config/source.json' );
const cheerio = require( 'cheerio' );

//request({ uri: "http://www1.bakuchessolympiad.com/content/53" }).pipe(fs.createWriteStream('players.html'));

let teams = [];

request({
  uri: "http://www1.bakuchessolympiad.com/content/53",
}, function(error, response, body) {
  let $ = cheerio.load(body);
  let team = {
     country: null,
     captain: {
         title: null,
         name: null,
         rating: null
     },
     players: []
  };

  let player = {
      title: null,
      name: null,
      rating: null
  };

  $(".country").each(function() {

    let data = $(this);
    team.country = data.attr('tabindex');

    if( team.country === 'England') {

    let tableRecord = data.find('table td');

    $( tableRecord ).each(function( index, element ) {

        let info = element.children[0].data;

        switch ( index ) {

            // --------- Captain Info
            case 3:
                team.captain.title = info;
                break;
            case 4:
                team.captain.name = info;
                break;
            case 5:
                team.captain.rating = info;
                break;

            // --------- Board One Info
            case 9:
                player.title = info;
                break;
            case 10:
                player.name = info;
                break;
            case 11:
                player.rating = info;
                team.players.push( player );
                console.log( player );
                break;

            // --------- Board Two Info
            case 12:
                player.title = info;
                break;
            case 13:
                player.name = info;
                break;
            case 14:
                player.rating = info;
                team.players.push( player );
                console.log( player );
                break;

            // --------- Board Three Info
            case 15:
                player.title = info;
                break;
            case 16:
                player.name = info;
                break;
            case 17:
                player.rating = info;
                team.players.push( player );
                console.log( player );
                break;

            // --------- Board Four Info
            case 18:
                player.title = info;
                break;
            case 19:
                player.name = info;
                break;
            case 20:
                player.rating = info;
                team.players.push( player );
                console.log( player );
                break;

            // --------- Board Five Info
            case 21:
                player.title = info;
                break;
            case 22:
                player.name = info;
                break;
            case 23:
                player.rating = info;
                team.players.push( player );
                console.log( player );
                console.log( team );
                break;

            // --------- Misc
            default:
                break;
        };

    });


    }

  });
}).on('end', function() {

    console.log(teams);

});
