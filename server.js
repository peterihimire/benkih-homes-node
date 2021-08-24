const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

// MODELS
const sequelize = require("./util/database");
const Property = require("./models/property");
const User = require("./models/user");

const HttpError = require("./models/http-error");

// ROUTES
const usersRoute = require("./routes/users-route");
const propertiesRoute = require("./routes/properties-route");

// AMAZON S3 BUCKET FILE STORAGE SETTINGS
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRETE_KEY,
  Bucket: process.env.AWS_BUCKET,
});
//  Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// EXPRESS APP INITIALIZATION
const app = express();

// MIDDLEWARES

// FOR FORM BODY WITHOUT FILE
app.use(bodyParser.json());

// FOR FORM BODY WITH FILE

// FOR MULTIPLE IMAGE UPLOAD TO AMAZON S3 BUCKET
app.use(
  multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET,
      acl: "public-read",
      key: function (req, file, cb) {
        cb(
          null,
          path.basename(file.originalname, path.extname(file.originalname)) +
            "-" +
            Date.now() +
            path.extname(file.originalname),
        );
      },
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).array("propertyImages", 3),
);

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
  } else {
    next();
  }
});

// FOR ROUTES

// => /api/users/
app.use("/api", usersRoute);
// => /api/properties/
app.use("/api", propertiesRoute);

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
  .sync({ force: true })
  // .sync()
  .then((result) => {
    console.log(result);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
