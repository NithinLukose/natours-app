const Tour = require("../model/tourModel");

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;

  // const tour = tours.find((tour) => tour.id === id * 1);
  // if (tour) {
  res.status(200).json({
    status: "success",
    // data: {
    //   tour,
    // },
  });
  // }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "placeholder",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
