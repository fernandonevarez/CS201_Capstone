require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

const notFoundError = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const stripeController = require("./Controllers/SpriteController")

// const {mailSender, resetPasswordSender} = require("./Controller/sendEmail")

const port = 3000

app
  .use(express.json())
  .use(express.static(path.join(__dirname, '../client/build')))

  .use('/stripe', stripeController)

  
  .use(notFoundError)
// .use(errorHandlerMiddleware)


const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`listening at port ${port}`))

  } catch (error) {
    console.log(error);
  }
}

start();