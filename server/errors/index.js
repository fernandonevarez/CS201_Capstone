const BadRequestError = require("./bad-request");
const UnauthError = require("./unauth");
const CustomAPIError = require("./custom-error");
const NotFoundError = require("./not-found");

module.exports = {
	BadRequestError,
	UnauthError,
	CustomAPIError,
	NotFoundError,
};
