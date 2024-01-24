const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel =require('./models/UserModel')
const itemModel = require("./models/ItemModel");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT

mongoose.connect(process.env.DB_TYPE + "+srv://" + process.env.DB_USERNAME+ process.env.DB_PASSWORD+ "@" + process.env.DB_HOST+"/"+process.env.DB_NAME)

app.post("/user", (req, res) => {
  userModel
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password or Email are incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.get("/user", (req, res) => {
  userModel
    .find(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/create", (req, res) => {
  itemModel
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.get("/item", async (req, res) => {
  try {
    const items = await itemModel.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.mesaage });
  }
});

app.get("/item/:id", (req, res) => {
  const id = req.params.id;
  itemModel
    .findById({ _id: id })
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.patch("/item/:id", (req, res) => {
  const id = req.params.id;
  itemModel
    .findByIdAndUpdate(
      { _id: id },
      {
        item: req.body.item,
        stocks: req.body.stocks,
        price: req.body.price,
      }
    )
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.delete("/item/:id", (req, res) => {
  const id = req.params.id;
  itemModel
    .findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
