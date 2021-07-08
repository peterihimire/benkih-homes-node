const User = require('../models/user')


// @route POST api/user/signup
// @desc To create or signup a user
// @access Public
const signup = (req, res, next) => {

  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  // const admincode = req.body.admincode;

  if(!fullName || !email || !password ){
    res.status(200).json({ message: "Invalid Inputs passed, Please check your fields." });
  }
  User.create({
    fullName: fullName,
    email: email,
    password: password,
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

  // console.log('This is signup route')
  // res.status(200).json({ message: "Yeah, I bet you , we are comming there!" });
}

exports.signup = signup;