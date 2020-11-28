const isEmpty = (string) => {
	return (string.trim() === "") ? true : false;
};

const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return (email.match(emailRegEx)) ? true : false;
};

exports.validateLoginData = (data) => {
   let errors = {};
   if (isEmpty(data.email)) {
	   errors.email = "Must not be empty";
   }
   if (isEmpty(data.password)) {
	   errors.password = "Must not be  empty";
   }
   return {
       errors,
       valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateSignUpData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = "Must not be empty";
	} else if (!isEmail(data.email)) {
		errors.email = "Must be a valid email address";
	}

	if (isEmpty(data.password)) {
		errors.password = "Must not be empty";
	}
	if (data.password !== data.confirmPassword) {
		errors.confirmPassword = "Passwords must be the same";
	}
	if (isEmpty(data.username)) {
		errors.username = "Must not be empty";
	}

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};