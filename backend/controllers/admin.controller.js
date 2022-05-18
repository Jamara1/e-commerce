"use strict";

let bcrypt = require("bcrypt-nodejs");
let admin = require("../models/admin.model");
let jwt = require("../helpers/jwt");

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

const ADMIN_LOGIN = async function (request, response) {
  let data = request.body;
  let adminArray = [];

  adminArray = await admin.find({
    email: data.email,
  });

  if (adminArray.length === 0) {
    response.status(200).send({
      message: "E-mail not found",
      data: undefined,
    });

    return;
  }

  let user = adminArray[0];

  bcrypt.compare(data.password, user.password, async function (error, check) {
    if (!check) {
      response.status(200).send({
        message: "Incorrect password",
        data: undefined,
      });

      return;
    }

    response.status(200).send({
      data: user,
      _token: jwt.createToken(user)
    });
  });
};

module.exports = {
  ADMIN_REGISTER,
  ADMIN_LOGIN,
};
