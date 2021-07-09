const path = require('path');

const express = require('express');

const usersController = require('../controllers/users-controller')

const router = express.Router();

// /api/users/signup => POST
router.post('/signup', usersController.signup )

// /api/users/login => POST
router.post('/login', usersController.login )

// /api/users/userId => PUT
router.put('/:userId', usersController.updateUserById )

module.exports = router;