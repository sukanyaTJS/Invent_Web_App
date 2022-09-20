const express = require("express");
const app = express();

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "pubblic/js"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const user = [
    {
      "id": 1,
      "name": "Tejasri",
      "asset": "laptop",
      "date": "12-02-2021",
    },
    {
      "id": 2,
      "name": "Sukanya",
      "asset": "Monitor",
      "date": "12-02-2022",
    },
    {
      "id": 3,
      "name": "sarvani",
      "asset": "laptop",
      "date": "26-05-2022",
    },
  ];
  res.render("index", { user });
});

app.listen(8000, () => console.log("server running..."));
