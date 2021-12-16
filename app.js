const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const apiRoute = require("./route");

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.use("/api", apiRoute);

app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("", (request, result) =>
  result.sendFile(__dirname + "/view/index.html")
);

app.get("/register", (request, result) =>
  result.sendFile(__dirname + "/view/register.html")
);

app.get("/home", (request, result) =>
  result.sendFile(__dirname + "/view/home.html")
);

module.exports = app;
