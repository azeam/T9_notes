import React, { Component } from "react";
import axios from "axios";
import SubmitButton from "../components/Button";
import SignupInput from "../components/Input";
import history from "../utils/history";
import "../components/Background.css";
import Header from "../components/Header";
import Title from "../components/Title";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";

class signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			message: []
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
				history.push("/login", {
					message: response.data
				});
			})
			.catch((error) => {
				if (error.response) {
					this.setState({
						message: Object.entries(error.response.data)
					});
				} 
				else {
					this.setState({
						message: Object.entries({ error: error.message})
					});
				}
			});
	};

	render() {
		return (
			<>
				<div className="container">
					<Header className="header1" label="Sign up" name="signup" />
					<form className="signup">
						<SignupInput type="text" id="username" label="Username" name="username" onChange={this.handleChange} />
						<SignupInput type="email" id="email" label="E-mail" name="email" onChange={this.handleChange} />
						<SignupInput type="password" id="password" label="Password" name="password" onChange={this.handleChange} />
						<SignupInput type="password" id="confirmPassword" label="Confirm password" name="confirmPassword" onChange={this.handleChange} />
						<MessageBox className="message" message={this.state.message} />
						<SubmitButton id="btn-signup" className="btn" label="SEND" type="submit" onClick={this.handleSubmit} />						
					</form>
					<p className="link-text">Already have account? Back to&nbsp;
						<Link className="links" to={location => ({ ...location, pathname: "/login" })}>
							Log in	
						</Link>
					</p>
				</div>
				<Title className="title" label="Super Dementia Helper 2000" name="title" />
			</>
		);
	}
}

export default (signup);