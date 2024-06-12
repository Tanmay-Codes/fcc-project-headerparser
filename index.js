// index.js
// where your node app starts

// init project
require("dotenv").config();
const express = require("express");
const app = express();
const os = require("os");
const ifaces = os.networkInterfaces();

const ipAddress = ifaces["Wi-Fi"].filter((item) => item.family === "IPv4")[0]
  .address;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + "/public/"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/whoami", function (req, res) {
  let me = {};
  me["ipaddress"] = ipAddress;
  me["language"] = req.headers["accept-language"];
  me["software"] = req.headers["user-agent"];

  res.send(me);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
