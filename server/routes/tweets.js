"use strict";

const userHelper = require("../lib/util/user-helper");

const express = require("express");
const tweetsRoutes = express.Router();

module.exports = function (DataHelpers) {
  tweetsRoutes.get("/", function (req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        for (let tweet of tweets) {
          let millis = Date.now() - tweet["created_at"];
          if (millis >= 86400000) {
            let day = Math.floor(millis / 86400000);
            tweet["days"] = `${day} days ago`;
          } else {
            tweet["days"] = `tweet created today`;
          }
        }
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function (req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }

    const user = req.body.user
      ? req.body.user
      : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text,
      },
      created_at: Date.now(),
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;
};
