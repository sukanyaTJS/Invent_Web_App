const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose
      .connect("mongodb://localhost:27017/Inventory_Management")
      .then(() => console.log("Database connected!"));
  } catch (err) {
    console.log(err);
  }
};


module.exports = connectDB

// mongoose
//   .connect("mongodb://localhost:27017/Inventory_Management")
//   .then(() => console.log("Database connected!"))
//   .catch((err) => console.log(err));
