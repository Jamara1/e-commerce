"use strict";

let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let port = process.env.PORT || 4201;

let clientRoute = require("./routes/client.routes");
let adminRoute = require("./routes/admin.routes");

mongoose.connect(
  "mongodb://127.0.0.1:27017/e-commerce",
  (error, response) => {
    if (error) {
      console.log(error);
    } else {
      app.listen(port, function () {
        console.log("Server start in the port " + port);
      });
    }
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  response.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS"
  );
  response.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use("/api", clientRoute);
app.use("/api", adminRoute);

module.exports = app;
