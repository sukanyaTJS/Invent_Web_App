const express = require("express");
const app = express();

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "pubblic/js"));

app.set("view engine", "ejs");

let user = [
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



var assetData = [
  {
    "id": 1,
    "asset": "laptop",
    "action": "request"
    
  },
  {
    "id": 2,
    "asset": "Monitor",
    "action": "request"
  
  },
  {
    "id": 3,
    "asset": "laptop",
    "action": "request"
  },
];




app.get("/", (req, res) => {
  res.render("index", { user });
});

app.get('/getAsset',(req,res) => {
  console.log(assetData.length)
  res.render('create_asset',{assetData})
})


app.get('/userDetails',(req,res) => {
  res.render('user_details')
})

app.post('/addAsset',async (req,res) => {
  const newAsset = await assetData.push({
    id: assetData.length + 1,
    name: req.body.name,
    action: "request"
  })

  if(newAsset){
  res.render('create_asset',{assetData})
  }else{
    res.send("failed to create new asset")
  }
})





app.listen(8000, () => console.log("server running..."));
