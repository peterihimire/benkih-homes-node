const path = require('path');

const express = require('express');

const usersController = require('../controllers/users-controller')

const router = express.Router();

router.post('/signup', usersController.signup )

module.exports = router;