const signup = (req, res, next) => {
  console.log('This is signup route')
  res.status(200).json({ message: "Yeah, I bet you , we are comming there!" });
}

exports.signup = signup;