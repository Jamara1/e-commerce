"use strict";

let client = require("../models/client.model");
let bcrypt = require("bcrypt-nodejs");

const CLIENT_REGISTER = async function (request, response) {
  let data = request.body;
  let clientArray = [];

  if (!data.identity) {
    response
      .status(200)
      .send({ message: "No identity number", data: undefined });
    return;
  }

  clientArray = await client.find({ email: data.email });

  if (clientArray.length > 0) {
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
    let register = await client.create(data);
    response.status(200).send({ data: register });
  });
};

module.exports = {
  CLIENT_REGISTER,
};
