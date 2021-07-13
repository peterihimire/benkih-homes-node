const express = require("express");
const { check } = require("express-validator");

// const isAuth = require("../middleware/check-auth");
const propertiesController = require("../controllers/properties-controller");

const router = express.Router();

// /api/properties/new-property => POST
router.post("/new-property", propertiesController.createProperty); // after the url /new-property is the [isAuth] middleware

// /api/properties => GET
router.get("/", propertiesController.getProperties);

// /api/properties/propertyId => GET
router.get("/:propertyId", propertiesController.getPropertyById);

module.exports = router;
