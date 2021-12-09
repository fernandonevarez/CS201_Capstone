const CustomAPIError = require("./custom-error");
const { StatusCodes: sc } = require("http-status-codes");

class BadRequest extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = sc.BAD_REQUEST;
	}
}

module.exports = BadRequest;
