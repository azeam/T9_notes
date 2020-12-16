const { admin, db } = require("./admin");

module.exports = (request, response, next) => {
	let idToken;
	if (request.headers.authorization && request.headers.authorization.startsWith("Bearer ")) {
		idToken = request.headers.authorization.split("Bearer ")[1];
	} else {
		return response.status(403).json({ error: "No authorization token found" });
	}
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			request.user = decodedToken;
			return db.collection("users").where("userId", "==", request.user.uid).limit(1).get();
		})
		.then((data) => {
			request.user.username = data.docs[0].data().username;
			return next();
		})
		.catch((err) => {
			return response.status(403).json({ error: "Not authorized" });
		});
};