const path = require("path");

const express = require("express");

const usersController = require("../controllers/users-controller");

const router = express.Router();

// /api/users/signup => POST
router.post("/signup", usersController.signup);

// /api/users/login => POST
router.post("/login", usersController.login);

// /api/users/ => GET
router.get("/", usersController.getAllUsers);

// /api/users/userId => PUT
router.put("/:userId", usersController.updateUserById);

// /api/users/userId => DELETE
router.delete("/:userId", usersController.deleteUserById);

module.exports = router;
