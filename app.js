const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/tokens", (req, res) => {
  const API_KEY = "e891877d-70b7-45c5-98b3-96319b8408c4";
  const SECRET_KEY =
    "dfc2cce69cc9b2128b3d4b2c021b373a339dd707050c89cac472f355584c69e2";

  const options = { expiresIn: "10m", algorithm: "HS256" };
  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod", "ask_join"], // Trigger permission.
  };

  const token = jwt.sign(payload, SECRET_KEY, options);

  res.json({ token });
});

app.get("/meetings", (req, response) => {
  const API_KEY = "e891877d-70b7-45c5-98b3-96319b8408c4";
  const SECRET_KEY =
    "dfc2cce69cc9b2128b3d4b2c021b373a339dd707050c89cac472f355584c69e2";

  const options = { expiresIn: "10m", algorithm: "HS256" };
  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod", "ask_join"],
  };

  const token = jwt.sign(payload, SECRET_KEY, options);

  var meetingRequest = {
    method: "POST",
    url: "https://api.zujonow.com/v1/meetings",
    headers: {
      authorization: token,
    },
  };

  axios(meetingRequest).then((res) => {
    const { meetingId } = res.data;

    response.render("home", { meetingId, token });
  });
});

app.listen(3000, () => console.log("App running on port 3000..."));
