const path = require('path');

const express = require('express');

const propertiesController = require('../controllers/properties-controller')

const router = express.Router();

// /api/properties/new-property => POST
router.post('/new-property', propertiesController.createProperty )

// /api/properties => GET
router.get('/', propertiesController.getProperties )

// // /api/users/userId => PUT
// router.put('/:userId', usersController.updateUserById )

module.exports = router;