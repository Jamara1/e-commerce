"use strict";

let bcrypt = require("bcrypt-nodejs");
let client = require("../models/client.model");
let jwt = require("../helpers/jwt");

const CLIENT_REGISTER = async function (request, response) {
  let data = request.body;
  let clientArray = [];

  if (!data.identity) {
    response
      .status(400)
      .send({ message: "No identity number", data: undefined });
    return;
  }

  if (!data.email) {
    response
      .status(400)
      .send({ message: "No e-mail", data: undefined });
    return;
  }

  clientArray = await client.find({ email: data.email });

  if (clientArray.length > 0) {
    response
      .status(400)
      .send({ message: "This email already exists", data: undefined });
    return;
  }

  if (!data.password) {
    response.status(400).send({ message: "No password", data: undefined });
    return;
  }

  bcrypt.hash(data.password, null, null, async function (error, hash) {
    if (!hash) {
      response.status(500).send({ message: "Error server: error encrypt password", data: undefined });
      return;
    }

    data.password = hash;
    let register = await client.create(data);
    response.status(200).send({ data: register });
  });
};

const CLIENT_LOGIN = async function (request, response) {
  let data = request.body;
  let clientArray = [];

  clientArray = await client.find({
    email: data.email,
  });

  if (clientArray.length === 0) {
    response.status(400).send({
      message: "E-mail not found",
      data: undefined,
    });

    return;
  }

  let user = clientArray[0];

  bcrypt.compare(data.password, user.password, async function (error, check) {
    if (!check) {
      response.status(400).send({
        message: "Incorrect password",
        data: undefined,
      });

      return;
    }

    response.status(200).send({
      data: user,
      _token: jwt.createToken(user),
    });
  });
};

const CLIENT_LIST_ADMIN = async function (request, response) {
  let type = request.params["type"];
  let filter = request.params["filter"];

  if (type === null || type === "null") {
    let register = await client.find();
    response.status(200).send({
      data: register,
    });
  } else {
    if (type === "firstname") {
      let register = await client.find({ firstname: new RegExp(filter, "i") });
      response.status(200).send({
        data: register,
      });
    } else if (type === "lastname") {
      let register = await client.find({ lastname: new RegExp(filter, "i") });
      response.status(200).send({
        data: register,
      });
    } else if (type === "email") {
      let register = await client.find({ email: new RegExp(filter, "i") });
      response.status(200).send({
        data: register,
      });
    }
  }
};

module.exports = {
  CLIENT_REGISTER,
  CLIENT_LOGIN,
  CLIENT_LIST_ADMIN,
};
