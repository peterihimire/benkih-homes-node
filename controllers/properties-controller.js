const HttpError = require("../models/http-error");
const Property = require("../models/property");
const User = require("../models/user");
const { validationResult } = require("express-validator");

// @route POST api/property
// @desc To create a new property
// @access Public
const createProperty = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(
      new HttpError("Invalid inputs passed, please check your fields.", 422),
    );
  }

  // checks for image file
  if (!req.file) {
    next(new HttpError("Please provide an image. ", 422));
  }

  const title = req.body.title;
  const slug = req.body.slug;
  const address = req.body.address;
  const amount = req.body.amount;
  const description = req.body.description;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const bedroom = req.body.bedroom;
  const bathroom = req.body.bathroom;
  const imagez = req.file.path;
  const propertyCity = req.body.propertyCity;
  const propertyState = req.body.propertyState;
  const furnished = req.body.furnished;
  const inDoorPool = req.body.inDoorPool;
  const outDoorPool = req.body.outDoorPool;
  const miniTheater = req.body.miniTheater;
  const featured = req.body.featured;
  const recent = req.body.recent;
  const newProperty = req.body.newProperty;
  // [userId] property is responsible for displaying the creator [User] object inside of the Property object, in the form of a Relations .
  const userId = req.body.userId;
  console.log(imagez);

  Property.create({
    title: title,
    slug: slug,
    address: address,
    amount: amount,
    description: description,
    latitude: latitude,
    longitude: longitude,
    bedroom: bedroom,
    bathroom: bathroom,
    imagez: imagez,
    propertyCity: propertyCity,
    propertyState: propertyState,
    furnished: furnished,
    inDoorPool: inDoorPool,
    outDoorPool: outDoorPool,
    miniTheater: miniTheater,
    featured: featured,
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

// @route GET api/properties
// @desc To retrieve the data of all properties
// @access Public
const getProperties = (req, res, next) => {
  // {include: [User]} adds the User object to the Property object via userId property
  Property.findAll({ include: [User] })
    .then((properties) => {
      if (!properties || properties.length === 0) {
        const error = new Error("No properties found.");
        error.code = 404;
        return next(error);
      }
      res.status(200).json({
        status: "Successful",
        msg: "All Properties",
        properties: properties,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// @route GET api/properties/id
// @desc To retrieve the data of a single property
// @access Public
const getPropertyById = (req, res, next) => {
  const propertyId = req.params.propertyId;
  Property.findByPk(propertyId)
    .then((property) => {
      if (!property) {
        const error = new Error("Property not found for this particular id."); // Error handling with only error middleware
        error.code = 404;
        return next(error);
      }
      res.status(200).json({
        status: "Successful",
        msg: "Single Property",
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

// @route PUT api/properties/id
// @desc To update the data of a single property
// @access Public
const updatePropertyById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(
      new HttpError("Invalid inputs passed, please check your fields.", 422),
    );
  }
  const propertyId = req.params.propertyId;
  const {
    title,
    slug,
    address,
    amount,
    description,
    longitude,
    latitude,
    bedroom,
    bathroom,
    propertyCity,
    propertyState,
    featrued,
    recent,
    newProperty,
  } = req.body;

  Property.findByPk(propertyId)
    .then((property) => {
      if (!property) {
        return next(
          new HttpError("No property found for this particular id.", 404),
        );
      }
      return property;
    })
    .then((updatedProperty) => {
      updatedProperty.title = title;
      updatedProperty.slug = slug;
      updatedProperty.address = address;
      updatedProperty.amount = amount;
      updatedProperty.description = description;
      updatedProperty.longitude = longitude;
      updatedProperty.latitude = latitude;
      updatedProperty.bedroom = bedroom;
      updatedProperty.bathroom = bathroom;
      updatedProperty.propertyCity = propertyCity;
      updatedProperty.propertyState = propertyState;
      updatedProperty.featrued = featrued;
      updatedProperty.recent = recent;
      updatedProperty.newnewProperty = newProperty;

      return updatedProperty.save();
    })
    .then((updatedProperty) => {
      res.status(200).json({
        status: "Successful",
        msg: "Property updated",
        property: updatedProperty,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// @route DELETE api/properties/id
// @desc To delete the data of a single property
// @access Private
const deletePropertyById = (req, res, next) => {
  const propertyId = req.params.propertyId;
  Property.findByPk(propertyId)
    .then((property) => {
      if (!property) {
        const error = new Error("Property not found for this particular id.");
        error.code = 404;
        return next(error);
      }
      return property;
    })
    .then((property) => {
      return property.destroy();
    })
    .then((deletedProperty) => {
      res.status(200).json({
        status: "Successful",
        msg: "Property Deleted",
        user: deletedProperty,
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
exports.getProperties = getProperties;
exports.getPropertyById = getPropertyById;
exports.updatePropertyById = updatePropertyById;
exports.deletePropertyById = deletePropertyById;
