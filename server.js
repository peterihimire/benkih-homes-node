const fs = require('fs');
const path = require('path');

const express = require('express')

// MODELS
const sequelize = require("./util/database");
// const Property = require("./models/property");
// const User = require("./models/user");

// ROUTES
const usersRoute = require('./routes/users-route');

const app = express()

// ROUTES MIDDLEWARE

// => /api/users/
app.use('/api/users', usersRoute)

const PORT = 4000;


sequelize
  .sync()
  .then(() => {
    app.listen( PORT,() => console.log(`Server is running on port ${PORT}`))
  })
  .catch((err) => console.log(err));
