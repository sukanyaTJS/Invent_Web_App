const User = require("../model/user_model");

//create users or Post
exports.create = async (req, res) => {
  try {
    //validate request
    if (!req.body) {
      res.render("error404");
    }

    //new user
    const user = await User.create({
      id: req.body.id,
      name: req.body.name,
      // asset: req.body.asset,
    });
    if (user) {
      res.send(user);
    } else {
      res.send("failed to create");
    }
  } catch (error) {
    res.send("failed try again");
  }
};

//Get users
exports.find = async (req, res) => {
  try {
    if (req.query.id) {
      const id = req.query.id;
      const data = await User.findById(id);
      if (!data) {
        res.render("error404");
      } else {
        res.render("index", { users: data });
      }
    } else {
      const user = await User.find({ isActive: true });
      if (user) {
        res.render("index", { users: user });
      } else {
        res.render("error404");
      }
    }
  } catch (error) {
    res.render("error404");
  }
};

// update users
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      res.render("error404");
    }
    const id = req.params.id;
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      res.render("error404");
    } else {
      res.send(data);
    }
  } catch (error) {
    res.render("error404");
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.body.password || req.body.password !== process.env.PASSWORD) {
      res.render("error404");
    } else {
      const user = await User.findOneAndUpdate(
        { id: req.body.userId },
        { isActive: false },
        { new: true }
      );

      if (user) {
        res.redirect("index");
      } else {
        res.render("error404");
      }
    }
  } catch (error) {
    res.render("error404");
  }
};
