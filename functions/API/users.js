const { admin, db } = require("../admin/admin");
const config = require("../admin/config");
const firebase = require("firebase");
const { validateLoginData, validateSignUpData } = require("../admin/validators");

firebase.initializeApp(config);

// login
exports.loginUser = (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    const { valid, errors } = validateLoginData(user);
	if (!valid) {
        return response.status(400).json(errors);
    }

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.json({ token });
        })
        .catch((error) => {
            return response.status(403).json({ error: error.message });		
        })
};

// signup
exports.signUpUser = (request, response) => {
    const newUser = {
        email: request.body.email,
      	password: request.body.password,
		confirmPassword: request.body.confirmPassword,
		username: request.body.username
    };

    const { valid, errors } = validateSignUpData(newUser);

	if (!valid) {
        return response.status(400).json(errors);
    }

    let userId;
    let keepOn = true; 
    db
        .doc(`/users/${newUser.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                keepOn = false; // stop the thens on error to prevent Unhandled Promise, probably not the "correct" way to handle this...
                return response.status(400).json({ error: "This username is already taken" });
            } else {
                return firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            newUser.email, 
                            newUser.password
                    );
            }
        })
        .then((data) => {
            if (keepOn) {
                userId = data.user.uid;
                return data.user.getIdToken();
            }
        })
        .then(() => {
            if (keepOn) {
                const userCredentials = {
                    username: newUser.username,
                    email: newUser.email,
                    timestamp: new Date().toISOString(),
                    userId
                };
                return db
                        .doc(`/users/${newUser.username}`)
                        .set(userCredentials);
            }
        })
        .then(() => {
            if (keepOn) {
                return response.status(201).json({ message: "User signed up, you can now log in." });
            }
        })
        .catch((error) => {
            return response.status(500).json({ error: error.message });		
		});
}