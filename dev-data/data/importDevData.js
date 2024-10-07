const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

const Tour = require("../../model/tourModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_CONNECTION_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("connection successful");
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

//import data to DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data loaded");
  } catch (err) {
    console.log(err);
  }
};

//delete existing data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data deleted");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
  process.exit();
} else if (process.argv[2] === "--delete") {
  deleteData();
  process.exit();
}
