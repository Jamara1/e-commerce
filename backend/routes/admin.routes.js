'use strict';

let express = require('express');
let adminController = require('../controllers/admin.controller');

let api = express.Router();

api.post("/admin-register", adminController.ADMIN_REGISTER);
api.post("/admin-login", adminController.ADMIN_LOGIN);

module.exports = api;