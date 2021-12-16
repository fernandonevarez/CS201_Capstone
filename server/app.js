
// enviroment setup
require("dotenv").config();
require("express-async-errors");

// core app
const express = require("express");
const app = express();
const connectDB = require("./database/connect");

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticationMiddleware = require("./middleware/auth");

// controllers
const stripeController = require("./Controllers/SpriteController")

// Routes
const productRouter = require("./Routes/productRoute")
const authRouter = require("./Routes/authRoute");

// sercurity libraries
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");

// swaggerUI
// const YAML = require("yamljs");
// const swaggerUI = require("swagger-ui-express");
// const swaggerDocument = YAML.load("./swagger.yaml");

// couldinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

// fileuploader
const fileUpload = require("express-fileupload")

// variables
const minutes = 1000 * 60;
const limit = 15 * minutes;

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app
      .set("trust proxy", 1) // 1 meaning true
      .use(
        rateLimiter({
          windowMs: limit,
          max: 100,
        })
      )
      // .usd(express.static("./publicTwo"))
      .use([express.urlencoded({ extended: false }), express.json()])
      .use(fileUpload({ useTempFiles: true }))
      // safety blanket
      .use(helmet())
      // cors prevents CORS errors
      .use(cors())
      // xss (user sanitization) - cleans up user inputs to make sure they are safe.
      .use(xss())


      // routes


      .use("/api/v1/auth", authRouter)
      .use("/api/v1/products", authenticationMiddleware, productRouter)

      // .use(errorHandlerMiddleware)

      .listen(port, () => {
        console.log(`LISTENING => ${port}`);
      });
  } catch (err) {
    console.error(err);
  }
};

startServer();
