const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  const { id } = req.params;

  const tour = tours.find((tour) => tour.id === id * 1);
  if (tour) {
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } else {
    return res.status(404).json({
      status: "failed",
      message: "Invalid  id",
    });
  }
});

app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch("/api/v1/tours/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "placeholder",
    },
  });
});

app.delete("/api/v1/tours/:id", (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log("running on port 3000");
});
