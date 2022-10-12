const User = require("../model/user_model");

//create users or Post
exports.create = async (req, res) => {
  //validate request
  if (!req.body) {
    // res.status(400).send({ message: "content can not be empty!" });
    res.render("errorPage");
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
  user.save()
  .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      // res.status(500).send({
      //   message: "error occured while creating user details",
      // });
      res.render("errorPage");

    });
};

//Get users
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    User.findById(id)
      .then((data) => {
        if (!data) {
          // res.status(404).send({
          //   message: "not found user with id" + id,
          // });
          res.render("errorPage");
        } else {
          // res.send(data);
          res.render("index", { users: data });
        }
      })
      .catch((err) => {
        // res.status(500).send({
        //   message: "error retriving user with id" + id,
        // });
        res.render("errorPage");
      });
  } else {
    User.find()
      .then((user) => {
        //res.send(user);
        res.render("index", { users: user });
      })
      .catch((err) => {
        // res.status(500).send({
        //   message: "erroe occur while retriving user info",
        // });
        res.render("errorPage");

      });
  }
};

// update users
exports.update = (req, res) => {
  if (!req.body) {
    // return res.status(400).send({
    //   message: "Data to update can not be empty",
    // });
    res.render("errorPage");
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        // res.status(404).send({
        //   message: `cannot update user with ${id}. May be user not found`,
        // });
        res.render("errorPage");
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      // res.status(500).send({
      //   message: "error update user information",
      // });
      res.render("errorPage");
    });
};