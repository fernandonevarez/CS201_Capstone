const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  // every error that happens on my app will go through this middleware
  // return res.json({ err });

  // this is a custom error, so that i can deal with any error
  let customError = {
    statusCode: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || "Something went wrong, please try again later",
  };
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `${Object.values(
      err.keyValue
    )} is already taken, Please provide a different email`;
		customError.statusCode = 400;
  }

	if(err.name === "CastError"){
		customError.msg = `No item found with id: ${err.value}`;
		customError.statusCode = 404;
	}

  return res.status(customError.statusCode).json({ msg: customError });
};

module.exports = errorHandlerMiddleware;
