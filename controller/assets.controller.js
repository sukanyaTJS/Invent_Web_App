const Asset = require("../model/assets_model");
const User = require("../model/user_model");

//create Assets or Post

exports.create = async (req, res) => {
  //validate request
  if (!req.body) {
    res.render("errorPage");
    // res.status(400).send({ message: "content can not be empty!" });
  }

  //new Asset
  const newAsset = await Asset.create({
    name: req.body.name,
    // description: req.body.description,
    // createdAt: req.body.createdAt
  });

  if (newAsset) {
    //res.send(newAsset);
    res.redirect("/api/assets");
  } else {
    res.render("errorPage");
    // res.status(500).send({
    //   message: "error occured while creating Asset details",
    // });
  }
};

// Get Assets
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Asset.findOne({
      _id: id,
      $or: [{ status: "UnAssigned" }, { status: "waiting" }],
    })
      .then((data) => {
        if (!data) {
          res.render("errorPage");
          // res.status(404).send({
          //   message: "not found Asset with id" + id,
          // });
        } else {
          //   res.send(data);
          res.render("assets", { assets: data });
        }
      })
      .catch((err) => {
        res.render("errorPage");
        // res.status(500).send({
        //   message: "error retriving Asset with id" + id,
        // });
      });
  } else {
    Asset.find({
      $or: [{ status: "UnAssigned" }, { status: "waiting" }],
    })
      .then((asset) => {
        console.log(asset);
        // res.send(asset);
        res.render("assets", { assets: asset });
      })
      .catch((err) => {
        res.render("errorPage");
        // res.status(500).send({
        //   message: "erroe occur while retriving Asset info",
        // });
      });
  }
};

// get assigned users
exports.getUsers = (req, res) => {
  const response = [];
  Asset.find({ status: "assigned" })
    .then(async (asset) => {
      // throw "Error";
      for (let i = 0; i < asset.length; i++) {
        const user = await User.findOne({ id: asset[i].userId });
        if (user) {
          response.push({
            _id: asset[i]._id,
            userName: user.name,
            description: asset[i].description,
            asset: asset[i].name,
            updatedAt: asset[i].updatedAt.toLocaleString(),
          });
        }
      }
      // res.send(response);
      res.render("index", { users: response });
    })
    .catch((err) => {
      res.render("errorPage");
      // res.status(500).send({
      //   message: "error occur while retriving Asset info",
      // });
    });
};

exports.usersHistory = async (req, res) => {
  const asset = await Asset.findById({ _id: req.params.assetId });
  if (asset) {
    // res.send(asset.history);
    res.render("history", { users: asset.history });
  } else {
    res.render("errorPage");
    // res.status(500).send({
    //   message: "error occur while retriving Asset info",
    // });
  }
};

//update Assets
exports.update = async (req, res) => {
  if (!req.body) {
    // return res.status(400).send({
    //   message: "Data to update can not be empty",
    // });

    return res.redirect("errorPage");
  }
  console.log(req.body);
  if (req.body.password) {
    if (req.body.password == "wework") {
      const asset = await Asset.findById(req.body.id);
      if (asset && asset.status == "waiting") {
        const data = await Asset.findByIdAndUpdate(
          { _id: req.body.id },
          { status: "assigned" },
          { description: req.body.description },
          { new: true }
        );
        if (data) {
          // res.send(data);
          res.redirect("/api/assets");
        } else {
          res.render("errorPage");
          // res.status(404).send({
          //   message: `cannot update Asset with ${req.body.id}. May be Asset not found`,
          // });
        }
      } else {
        const data = await Asset.findByIdAndUpdate(
          { _id: req.body.id },
          { status: "UnAssigned", userId: "" },
          { new: true }
        );
        if (data) {
          // res.send(data);
          res.redirect("/");
        } else {
          res.render("errorPage");
          // res.status(404).send({
          //   message: `cannot update Asset with ${req.body.id}. May be Asset not found`,
          // });
        }
      }
    } else {
      res.render("errorPage");
      // res.status(404).send({
      //   message: `incorrect password`,
      // });
    }
  } else {
    let history = "";
    const user = await User.findOne({ id: req.body.userId });
    if (user) {
      history = {
        id: user.id,
        name: user.name,
        createdAt: new Date().toLocaleString(),
      };
    }
    const data = await Asset.findByIdAndUpdate(
      { _id: req.body.id },
      {
        userId: req.body.userId,
        status: "waiting",
        $push: { history: history },
      },
      { new: true }
    );
    if (data) {
      // res.send(data);
      res.redirect("/api/assets");
    } else {
      res.render("errorPage");
      // res.status(404).send({
      //   message: `cannot update Asset with ${req.body.id}. May be Asset not found`,
      // });
    }
  }
};

//delete Assets
exports.delete = (req, res) => {
  const id = req.params.id;

  Asset.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `connot delete with id ${id}.may be id is wrong`,
        });
      } else {
        res.send({
          message: "Asset was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "could not delete Asset with id=" + id,
      });
    });
};
