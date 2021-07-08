const fs = require('fs');
const path = require('path');

const express = require('express')
const bodyParser = require("body-parser");


// MODELS
const sequelize = require("./util/database");
// const Property = require("./models/property");
// const User = require("./models/user");

// ROUTES
const usersRoute = require('./routes/users-route');

const app = express()

// MIDDLEWARES
app.use(bodyParser.json());

// ROUTES MIDDLEWARE

// => /api/users/
app.use('/api/users', usersRoute)

const PORT = 4000;


sequelize
  // sequelize special method [sync], looks through our models and creates tables for them , it syncs our model to the database by creating appropriate tables and relations for them. 
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen( PORT,() => console.log(`Server is running on port ${PORT}`))
  })
  .catch((err) => console.log(err));
