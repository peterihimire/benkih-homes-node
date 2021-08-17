const express = require("express");
const { check } = require("express-validator");

// const isAuth = require("../middleware/check-auth");
const propertiesController = require("../controllers/properties-controller");

const router = express.Router();

// /api/properties/new-property => POST
router.post("/properties/new-property", propertiesController.createProperty); // after the url /new-property is the [isAuth] middleware

// /api/properties => GET
router.get("/properties", propertiesController.getProperties);

// /api/properties/propertyId => GET
router.get("/properties/:propertyId", propertiesController.getPropertyById);

// /api/properties/propertyId => PUT
router.put("/properties/:propertyId", propertiesController.updatePropertyById);

// /api/properties/propertyId => DELETE
router.delete("/properties/:propertyId", propertiesController.deletePropertyById);

module.exports = router;
