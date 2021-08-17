const path = require("path");

const express = require("express");

const isAuth = require("../middleware/check-auth");
const usersController = require("../controllers/users-controller");



const router = express.Router();

// /api/users/signup => POST
router.post("/users/signup", usersController.signup);

// /api/users/login => POST
router.post("/users/login", usersController.login);

// /api/users/ => GET
router.get("/users", usersController.getAllUsers);

// /api/users/userId => GET
router.get("/users/:userId", isAuth, usersController.getUserById);

// /api/users/userId => PUT
router.put("/users/:userId", usersController.updateUserById);

// /api/users/userId => DELETE
router.delete("/users/:userId", usersController.deleteUserById);

module.exports = router;
