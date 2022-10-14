const User = require("../model/user_model");

//create users or Post
exports.create = async (req, res) => {
  //validate request
  if (!req.body) {
    res.render("error404");
  }

  //new user
  const allUsers = await User.find();

  const user = new User({
    id: allUsers.length + 1,
    name: req.body.name,
    asset: req.body.asset,
  });

  //save user in the database
  await user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.render("error404");
    });
};

//Get users
exports.find = async (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    await User.findById(id)
      .then((data) => {
        if (!data) {
          res.render("error404");
        } else {
          res.render("index", { users: data });
        }
      })
      .catch((err) => {
        res.render("error404");
      });
  } else {
    await User.find()
      .then((user) => {
        res.render("index", { users: user });
      })
      .catch((err) => {
        res.render("error404");
      });
  }
};

// update users
exports.update = async (req, res) => {
  if (!req.body) {
    res.render("error404");
  }

  const id = req.params.id;
  await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.render("error404");
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.render("error404");
    });
};
