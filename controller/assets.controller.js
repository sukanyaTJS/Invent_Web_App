const Asset = require("../model/assets_model");

//create Assets or Post
exports.create = async (req, res) => {
  console.log(req.body);
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "content can not be empty!" });
  }

  //new Asset
  const newAsset = await Asset.create({
    name: req.body.name,
    description: req.body.description,
    // createdAt: req.body.createdAt
  });

  if (newAsset) {
    //res.send(newAsset);
    res.redirect("/assets");
  } else {
    res.status(500).send({
      message: "error occured while creating Asset details",
    });
  }
};

//Get Assets
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Asset.findOne({ _id: id, status: "UnAssigned" })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: "not found Asset with id" + id,
          });
        } else {
        //   res.send(data);
          res.render("assets", { assets: data });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "error retriving Asset with id" + id,
        });
      });
  } else {
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
  }
};

//update Assets
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty",
    });
  }

  if (req.body.status) {
    const data = await Asset.findByIdAndUpdate(
      { _id: req.body.id },
      { status: req.body.status },
      { new: true }
    );
    if (data) {
      console.log(data);
      // res.send(data);
      res.redirect("/assets");
    } else {
      res.status(404).send({
        message: `cannot update Asset with ${req.body.id}. May be Asset not found`,
      });
    }
  } else {
    const data = await Asset.findByIdAndUpdate(
      { _id: req.body.id },
      { userId: req.body.userId },
      { new: true }
    );
    if (data) {
      console.log(data);
      // res.send(data);
      res.redirect("/assets");
    } else {
      res.status(404).send({
        message: `cannot update Asset with ${req.body.id}. May be Asset not found`,
      });
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
