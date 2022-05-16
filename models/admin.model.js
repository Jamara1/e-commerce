"use strict";

let mongoose = require("mongoose");
let shema = mongoose.Schema;

let adminShema = shema({
  identity: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: false },
  rol: { type: String, required: false },
});

module.exports = mongoose.model("admin", adminShema);
