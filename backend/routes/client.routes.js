'use strict';

let express = require('express');
let clientController = require('../controllers/client.controller');

let api = express.Router();

api.post('/client-register', clientController.CLIENT_REGISTER);
api.post('/client-login', clientController.CLIENT_LOGIN);

api.get('/client-list-admin/:type/:filter?', clientController.CLIENT_LIST_ADMIN);

module.exports = api;