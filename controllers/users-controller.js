const HttpError = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route POST api/user/signup
// @desc To create or signup a user
// @access Public
const signup = (req, res, next) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const admincode = req.body.admincode;

  if (!fullname || !email || !password) {
    return next(new HttpError("Input missing required fields.", 400));
  }
  User.findOne({ where: { email: email } })
    .then((existingUser) => {
      if (existingUser) {
        return next(
          new HttpError("Account already exist, login instead .", 422),
        );
      } else {
        // FOR PASSWORD HASHING
        return bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            // console.log(hashedPassword);
            // FOR ADMIN ROLE WITH WRONG CODE
            if (admincode !== "secrete123") {
              return User.create({
                fullname: fullname,
                email: email,
                password: hashedPassword,
                isAdmin: false,
              })
                .then((createdUser) => {
                  res.status(201).json({
                    status: "Successful",
                    msg: "Account Created !",
                    user: createdUser,
                  });
                })
                .catch((error) => {
                  if (!error.statusCode) {
                    error.statusCode = 500;
                  }
                  next(error);
                });
            }
            // FOR ADMIN ROLE WITH CORRECT CODE
            User.create({
              fullname: fullname,
              email: email,
              password: hashedPassword,
              isAdmin: true,
            })
              .then((createdUser) => {
                res.status(201).json({
                  status: "Successful",
                  msg: "Account Created !",
                  user: createdUser,
                });
              })
              .catch((error) => {
                if (!error.statusCode) {
                  error.statusCode = 500;
                }
                next(error);
              });
          })
          .catch((error) => {
            if (!error.statusCode) {
              error.statusCode = 500;
            }
            next(error);
          });
      }
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// @route POST api/user/login
// @desc To login/authenticate a user
// @access Public
const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email: email } })
    .then((existingUser) => {
      if (!existingUser) {
        return next(
          new HttpError(
            "Account does not exist, please signup for an account !",
            401,
          ),
        );
      }
      return existingUser;
    })
    .then((existingUser) => {
      return bcrypt
        .compare(password, existingUser.password)
        .then((isMatch) => {
          const token = jwt.sign(
            { email: existingUser.email, userId: existingUser.uuid },
            "jwt-secrete-key",
            { expiresIn: "1h" },
          );
          if (isMatch) {
            return res.status(200).json({
              status: "Successful",
              msg: "You just logged in",
              user: existingUser.fullname,
              token: token,
              admin: existingUser.isAdmin,
            });
          }
          return next(new HttpError("Login failed, Password error .", 401));
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.signup = signup;
exports.login = login;
