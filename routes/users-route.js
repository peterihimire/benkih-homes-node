const path = require('path');

const express = require('express');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  console.log('This is signup route')
  res.status(200).json({ message: "Yeah, I bet you , we are comming there!" });
})

module.exports = router;