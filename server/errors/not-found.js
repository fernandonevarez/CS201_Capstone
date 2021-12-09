const CustomAPIError = require("./custom-error");
const { StatusCodes: sc } = require("http-status-codes");

class NotFoundError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = sc.NOT_FOUND;
	}
}

module.exports = NotFoundError;
