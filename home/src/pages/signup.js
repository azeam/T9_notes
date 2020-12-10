import React, { Component } from "react";
import axios from "axios";
import SubmitButton from "../components/Button";
import SignupInput from "../components/Input";
import history from "../utils/history";
import "../components/Background.css";
import Header from "../components/Header";

class signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			email: "",
			password: "",
			confirmPassword: ""
		};
    }

	// update which form field data
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	// send request to api
	handleSubmit = (event) => {
		event.preventDefault(); // handle form with js
		const newUserData = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};
		axios
			.post("/signup", newUserData) // the proxy setting in package.json will re-route the request to the firebase db with /signup postpended, set to  https://us-central1-t9notes-5eb44.cloudfunctions.net/api if not running local api
			.then((response) => {
				console.log("token: ", `${response.data.token}`); // print token to console for debug
				history.push("/login"); // go to login page
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data); // print api response
				} 
				else {
					console.log("Error", error.message);
				}
			});
	};

	render() {
		return (
			<div className="container">
				<form className="signup">
					<Header className="header1" label="Signup" name="signup">Sign Up</Header>
					<SignupInput type="text" id="username" label="Username" name="username" onChange={this.handleChange}></SignupInput>
					<SignupInput type="email" id="email" label="E-mail" name="email" onChange={this.handleChange}></SignupInput>
					<SignupInput type="password" id="password" label="Password" name="password" onChange={this.handleChange}></SignupInput>
					<SignupInput type="password" id="confirmPassword" label="Confirm password" name="confirmPassword" onChange={this.handleChange}></SignupInput>

					<SubmitButton className="btn" label="SEND" type="submit" onClick={this.handleSubmit}></SubmitButton>
				</form>
			</div>
		);
	}
}

export default (signup);