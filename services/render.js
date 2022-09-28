const User = require("../model/user_model");
const Asset = require("../model/assets_model");


exports.homeRoutes = (req, res) => {
    User.find()
    .then((user) => {
       res.send(user);
        res.render("index", { users: user });
       
    })
    .catch((err) => {
      res.status(500).send({
        message: "erroe occur while retriving user info",
      });
    });
};

exports.create_asset = (req, res) => {
  //res.render("create_asset");
  Asset.find({status: "UnAssigned" })
      .then((asset) => {
        console.log(asset);
        // res.send(asset);
        res.render("assets", { assets: asset });
      })
      .catch((err) => {
        res.status(500).send({
          message: "erroe occur while retriving Asset info",
        });
      });
};

