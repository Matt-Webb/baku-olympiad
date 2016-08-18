"use strict";

const config = require('../config/source.json');

const loopPlayers = source => {

    const data = require(source);

    for (var i = 0, len = data.length; i < len; i++) {
        console.log(data[i].country);
    }
}

loopPlayers('../data/open_players.json');
