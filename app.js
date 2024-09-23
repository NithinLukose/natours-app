const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("hello from the other side");
});

const port = 3000;

app.listen(port, () => {
  console.log("running on port 3000");
});
