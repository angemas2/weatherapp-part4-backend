var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const User = require("../models/users");

const { checkBody } = require("../modules/checkBody");

router.post("/signup", async (req, res) => {
  let mdp = req.body.password;
  let email = req.body.email;
  let name=req.body.name;
  let body = { email: email, password: mdp };
  const foundUser = await User.findOne({
    email: { $regex: new RegExp(req.body.email, "i") },
  });

  if (!checkBody(body) || !email || !mdp) {
    res.json({ result: false, error: "Missing or empty fields" });
  } else if (!!foundUser) {
      res.json({ result: false, error: "User already exists" });
    } else {
      await new User({name,email,password:mdp}).save()  
      res.json({ result: true });
    }
});

router.post("/signin", (req, res) => {
  let mdp = req.body.password;
  let email = req.body.email;

  let body = { email: email, password: mdp };

  if (!checkBody(body) || !mdp || !email) {
    res.json({ result: false, error: "Missing or empty fields" });
  } else if (checkBody(body) || !mdp || !email) {
    User.findOne({
      email: { $regex: new RegExp(req.body.email, "i") },
    }).then((data) => {
      if (data) {
        res.json({ result: true });
      } else {
        res.json({ result: false, error: "User not found" });
      }
    });
  }
});

module.exports = router;
