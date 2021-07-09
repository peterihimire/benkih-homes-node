const HttpError = require("../models/http-error");
const User = require('../models/user')
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

  if(!fullname || !email || !password ){
    return next(new HttpError("Input missing required fields.", 400));
  }
  User.findOne({where: {email: email}})
    .then((user)=>{
      if(user){
        return next(new HttpError('Account already exist, login instead .', 422))
      } else {
        // FOR PASSWORD HASHING
        return bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            // console.log(hashedPassword);
            // FOR ADMIN ROLE
            if(admincode !== 'secrete123'){
              return  User.create({
                fullname: fullname,
                email: email,
                password: hashedPassword,
                isAdmin: false
              })
                .then((createdUser) => {
                  res.status(201).json({
                    status: 'Successful',
                    msg: 'Account Created !',
                    user: createdUser
                  })
                })
                .catch((error) => {
                  return console.log(error)
                })
            }
            User.create({
              fullname: fullname,
              email: email,
              password: hashedPassword,
              isAdmin: true
            })
              .then((createdUser) => {
                res.status(201).json({
                  status: 'Successful',
                  msg: 'Account Created !',
                  user: createdUser
                })
              })
              .catch((error) => {
                return console.log(error)
              })
          })
       
      }
    })
    .catch((error) => {
      if(!error.statusCode){
        error.statusCode = 500;
      }
      next(error)
    })
}

exports.signup = signup;