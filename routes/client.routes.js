'use strict';

let express = require('express');
let clientController = require('../controllers/client.controller');

let api = express.Router();

api.post('/client-register', clientController.CLIENT_REGISTER);

module.exports = api;