// const jwt = require("jsonwebtoken");
// const { UnauthError } = require("../errors");
require("dotenv").config();
// const jwt = require("express-jwt");
// const jwksRsa = require("jwks-rsa");
const jwt = require("jsonwebtoken");
const axios = require("axios")

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

const authenticationMiddleware = async (req, res, next) => {
	const auth = req.headers.authorization;

	if (!auth || !auth.startsWith("Bearer ")) {
		res.status(404).json({error: "Invalid Authoraztion Header"})
	} else {
		const token = auth.slice(auth.indexOf(" ") + 1, auth.length);
		const secret = await axios.get(`https://${process.env.DOMAIN}/.well-known/jwks.json`)

		console.log(secret.data.keys[0].kid)
		if (jwt.verify(token, secret.data.keys[0].kid)) {
			next();
		} else {
			res.status(401).json({error: "Unauthorized"})
		}
	}
}
module.exports = authenticationMiddleware;
