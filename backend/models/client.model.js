"use strict";

let mongoose = require("mongoose");
let shema = mongoose.Schema;

let clientShema = shema({
  identity: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: false },
  gender: { type: String, required: false },
  birthday: { type: String, required: false },
  country: { type: String, required: false },
  profile: { type: String, default: "profile.png", required: true },
});

module.exports = mongoose.model('client', clientShema);
