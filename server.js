const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// MODELS
const sequelize = require("./util/database");
const Property = require("./models/property");
const User = require("./models/user");

const HttpError = require("./models/http-error");

// ROUTES
const usersRoute = require("./routes/users-route");
const propertiesRoute = require("./routes/properties-route");

const app = express();

// MIDDLEWARES
app.use(bodyParser.json());

// FOR C.O.R.S ERROR
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept, Origin, X-Requested-With, Authorization",
  );
  next();
});

// ROUTES MIDDLEWARE

// => /api/users/
app.use("/api/users", usersRoute);
// => /api/properties/
app.use("/api/properties", propertiesRoute);

// ERROR HANDLING MIDDLEWARE FOR UNREGISTERED ROUTES
app.use((req, res, next) => {
  const error = new HttpError(
    "could not find this route! Make sure the URL is correct.",
    404,
  );
  throw error;
});

// ERROR HANDLING MIDDLEWARE
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    status: "Unsuccessful",
    msg: error.message || "An unknown error occurred",
  });
});

const PORT = 4000;

// RELATIONS OR SEQUELIZE ASSOCIATIONS
Property.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Property);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
