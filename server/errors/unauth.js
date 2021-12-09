const CustomAPIError = require("./custom-error");
const { StatusCodes: sc } = require("http-status-codes");

class UnauthError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = sc.UNAUTHORIZED;
    }
}

module.exports = UnauthError;