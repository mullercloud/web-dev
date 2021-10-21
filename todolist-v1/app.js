const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

let items = ['Grocery shopping', 'Clean house', 'Cut grass'];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

let today = new Date();
let currentDay = today.getDay();

let options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};

let day = today.toLocaleDateString("en-US", options);


  res.render("list", {kindOfDay: day, newListItems: items});

});

app.post("/", function(req, res){
  let item = req.body.newItem;

  items.push(item);

  res.redirect("/");


});


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
