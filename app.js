'use strict';

const config = require('./config/source.json');
const teams = require('./modules/official.teams.service');

console.log('initialising service');

// Get the OPEN players:
teams(config.open.url, config.open.output);

// Get the WOMENS players:
teams(config.womens.url, config.womens.output);
