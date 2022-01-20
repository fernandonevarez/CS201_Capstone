const jwt = require("jsonwebtoken");
const { UnauthError } = require("../errors");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// const authenticationMiddleware = async (req, res, next) => {
// 	const authHeader = req.headers.authorization;

// 	if (!authHeader || !authHeader.startsWith("Bearer ")) {
// 		throw new UnauthError("No token provided");
// 	}

// 	const token = authHeader.split(" ")[1];

// 	try {
// 		console.log(token);
// 		const payload = jwt.verify(token, process.env.JWT_SECRET);
		
// 		console.log(payload);

// 		req.user = { userID: payload.userID, name: payload.name };

// 		next();
// 	} catch(error) {
// 		throw new UnauthError("Not authorized to access this route");
// 	}
// };

const authenticationMiddleware = jwt({
	secret: jwksRsa.expressJwtSecret({
	  cache: true,
	  rateLimit: true,
	  jwksRequestsPerMinute: 5,
	  jwksUri: `https://${domain}/.well-known/jwks.json`,
	}),
  
	audience: audience,
	issuer: `https://${domain}/`,
	algorithms: ["RS256"],
  });

module.exports = authenticationMiddleware;
