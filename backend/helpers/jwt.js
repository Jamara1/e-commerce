'use strict';

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'johanamara';

exports.createToken = function(user) {
    let payload = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        created_at: moment().unix(),
        expire_at: moment().add(7, 'days').unix()
    }

    return jwt.encode(payload, secret);
}