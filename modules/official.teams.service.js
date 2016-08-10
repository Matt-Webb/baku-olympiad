'use strict';

const request = require('request');
const fs = require('fs');
const config = require('../config/source.json');
const cheerio = require('cheerio');

//request({ uri: "http://www1.bakuchessolympiad.com/content/53" }).pipe(fs.createWriteStream('players.html'));


let teams = [];

class Player {
    constructor() {
        this.board = null;
        this.title = null;
        this.name = null;
        this.rating = null;
    }
}

class Team {
    contructor() {
        this.country = null;
        this.captain = null;
        this.players = [];
    }
}

const cleanseInfo = data => {
    if (data) {
        let info = data.children[0].data;
        if (info) {
            info = info.trim();
        }
        return info;
    }
}

const processTeams = data => {

    return new Promise((fulfill, reject) => {

        let $ = cheerio.load(data);

        try {

            $(".country").each(function() {

                let data = $(this);
                let country = data.attr('tabindex');
                let team = new Team();

                team.country = country;

                if (country === 'England') {

                    let tableRecord = data.find('table td');

                    let captain = new Player();
                    captain.title = cleanseInfo(tableRecord['3'])
                    captain.name = cleanseInfo(tableRecord['4']);
                    captain.rating = cleanseInfo(tableRecord['5']);

                    team.captain = captain;

                    let boardOne = new Player();
                    boardOne.board = 1;
                    boardOne.title = cleanseInfo(tableRecord['9']);
                    boardOne.name = cleanseInfo(tableRecord['10']);
                    boardOne.rating = cleanseInfo(tableRecord['11']);

                    let boardTwo = new Player();
                    boardTwo.board = 2;
                    boardOne.title = cleanseInfo(tableRecord['12']);
                    boardOne.name = cleanseInfo(tableRecord['13']);
                    boardOne.rating = cleanseInfo(tableRecord['14']);

                    let boardThree = new Player();
                    boardThree.board = 3;
                    boardOne.title = cleanseInfo(tableRecord['15']);
                    boardOne.name = cleanseInfo(tableRecord['16']);
                    boardOne.rating = cleanseInfo(tableRecord['17']);

                    let boardFour = new Player();
                    boardFour.board = 4;
                    boardOne.title = cleanseInfo(tableRecord['18']);
                    boardOne.name = cleanseInfo(tableRecord['19']);
                    boardOne.rating = cleanseInfo(tableRecord['20']);

                    let boardFive = new Player();
                    boardFive.board = 5;
                    boardOne.title = cleanseInfo(tableRecord['21']);
                    boardOne.name = cleanseInfo(tableRecord['22']);
                    boardOne.rating = cleanseInfo(tableRecord['23']);

                    team.players = [];

                    team.players.push(boardOne);
                    team.players.push(boardTwo);
                    team.players.push(boardThree);
                    team.players.push(boardFour);
                    team.players.push(boardFive);

                    //teams.push(team);

                    console.log(team);

                    fs.appendFile('open_players.json', JSON.stringify(team), err => {
                        if (err) throw err;
                        console.log('Team added!', team.country);
                    });
                }
            });

            fulfill(teams);

        } catch (err) {
            reject(new Error(err));
        }
    });
}

request({
    uri: config.url,
}, (error, response, body) => {

    processTeams(body)
        .then(success => {
            console.log('complete');
        }, error => {
            console.log(error.message);
        });
});
