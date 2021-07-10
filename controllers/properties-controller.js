const HttpError = require("../models/http-error");
const Property = require("../models/property");
const User = require("../models/user");

// @route POST api/property
// @desc To create a new property
// @access Public
const createProperty = (req, res, next) => {
  const title = req.body.title;
  const slug = req.body.slug;
  const address = req.body.address;
  const amount = req.body.amount;
  const description = req.body.description;
  const creator = req.body.creator;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const bedroom = req.body.bedroom;
  const bathroom = req.body.bathroom;
  const propertyCity = req.body.propertyCity;
  const propertyState = req.body.propertyState;
  const featrued = req.body.featrued;
  const recent = req.body.recent;
  const newProperty = req.body.newProperty;
  const userId = req.body.creator;

  Property.create({
    title: title,
    slug: slug,
    address: address,
    amount: amount,
    description: description,
    creator: creator,
    latitude: latitude,
    longitude: longitude,
    bedroom: bedroom,
    bathroom: bathroom,
    propertyCity: propertyCity,
    propertyState: propertyState,
    featrued: featrued,
    recent: recent,
    newProperty: newProperty,
    userId: userId,
  })
    .then((property) => {
      res.status(201).json({
        status: "Successful",
        msg: "Property created !",
        property: property,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createProperty = createProperty;
