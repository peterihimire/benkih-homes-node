const path = require("path");

const express = require("express");

const propertiesController = require("../controllers/properties-controller");

const router = express.Router();

// /api/properties/new-property => POST
router.post("/new-property", propertiesController.createProperty);

// /api/properties => GET
router.get("/", propertiesController.getProperties);

// /api/properties/propertyId => GET
router.get("/:propertyId", propertiesController.getPropertyById);

module.exports = router;
