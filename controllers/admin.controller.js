"use strict";

let admin = require("../models/admin.model");
let bcrypt = require("bcrypt-nodejs");

const ADMIN_REGISTER = async function (request, response) {
  let data = request.body;
  let adminArray = [];

  if (!data.identity) {
    response
      .status(200)
      .send({ message: "No identity number", data: undefined });
    return;
  }

  adminArray = await admin.find({ email: data.email });

  if (adminArray.length > 0) {
    response
      .status(200)
      .send({ message: "This email already exists", data: undefined });
    return;
  }

  if (!data.password) {
    response.status(200).send({ message: "No password", data: undefined });
    return;
  }

  bcrypt.hash(data.password, null, null, async function (error, hash) {
    if (!hash) {
      response.status(200).send({ message: "Error server", data: undefined });
      return;
    }

    data.password = hash;
    let register = await admin.create(data);
    response.status(200).send({ data: register });
  });
};

module.exports = {
  ADMIN_REGISTER,
};
