const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

// MODELS
const sequelize = require("./util/database");
const Property = require("./models/property");
const User = require("./models/user");

const HttpError = require("./models/http-error");

// ROUTES
const usersRoute = require("./routes/users-route");
const propertiesRoute = require("./routes/properties-route");

// IMAGE-FILE METHODS
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();

// MIDDLEWARES

// FOR FORM BODY WITHOUT FILE
app.use(bodyParser.json());

// FOR FORM BODY WITH FILE
app.use(
  multer({
    limits: 500000,
    storage: fileStorage,
    fileFilter: fileFilter,
  }).array("image", 3),
);

// FOR IMAGES
app.use("/images", express.static(path.join(__dirname, "images")));

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
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  }
  next();
});

// FOR ROUTES

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

// FOR ERROR
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  // if error exist during image uplaod , delete file
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  res.status(error.code || 500);
  res.json({
    status: "Unsuccessful",
    msg: error.message || "An unknown error occurred",
  });
});

const PORT = process.env.PORT || 4000;

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
