const User = require("../model/user_model");

//create users or Post
exports.create = async (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "content can not be empty!" });
  }

  //new user
  const allUsers = await User.find();

  const user = new User({
    id: allUsers.length + 1,
    name: req.body.name,
    asset: req.body.asset,
    // createdAt: req.body.createdAt
  });

  //save user in the database
  user

    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "error occured while creating user details",
      });
    });
};

//Get users
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    User.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: "not found user with id" + id,
          });
        } else {
          // res.send(data);
          res.render("index", { users: data });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "error retriving user with id" + id,
        });
      });
  } else {
    User.find()
      .then((user) => {
        //res.send(user);
        res.render("index", { users: user });
      })
      .catch((err) => {
        res.status(500).send({
          message: "erroe occur while retriving user info",
        });
      });
  }
};

// update users
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty",
    });
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot update user with ${id}. May be user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "error update user information",
      });
    });
};

//delete users
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `connot delete with id ${id}.may be id is wrong`,
        });
      } else {
        res.send({
          message: "user was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "could not delete user with id=" + id,
      });
    });
};
